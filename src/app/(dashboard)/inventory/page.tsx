"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Box, ShoppingCart, AlertTriangle, Plus, Search, X, Check, Printer, FileText, Upload, Download, Trash2, Edit2 } from "lucide-react";
import { createPurchaseOrder, receivePurchaseOrder, updateItemQuantity, deleteItem } from '@/app/actions/inventory';

export default function InventoryDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal States
  const [showPOModal, setShowPOModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  
  // Item Details & COA Upload State
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [itemType, setItemType] = useState<'Product' | 'Material'>('Product');
  const [itemDocs, setItemDocs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingQty, setIsEditingQty] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const [pRes, mRes, poRes, vRes] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('materials').select('*').order('name'),
      supabase.from('purchase_orders').select('*, vendors(name)').order('created_at', { ascending: false }),
      supabase.from('vendors').select('*').order('name')
    ]);
    
    setProducts(pRes.data || []);
    setMaterials(mRes.data || []);
    setPurchaseOrders(poRes.data || []);
    setVendors(vRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePO = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createPurchaseOrder(formData);
      setShowPOModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReceivePO = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await receivePurchaseOrder(formData);
      setShowReceiveModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openItemDetails = async (item: any, type: 'Product' | 'Material') => {
    setSelectedItem(item);
    setItemType(type);
    setItemDocs([]);
    setIsEditingQty(false);
    
    // Fetch related documents
    const { data: links } = await supabase
      .from('document_links')
      .select('documents(*)')
      .eq('related_record_type', type)
      .eq('related_record_id', item.id);
      
    if (links) {
      setItemDocs(links.map((link: any) => link.documents));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedItem) return;
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      // 1. Upload to Supabase Storage bucket 'coas'
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedItem.id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('coas')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage.from('coas').getPublicUrl(filePath);

      // 3. Create Document Record
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .insert({
          company_id: selectedItem.company_id,
          document_name: file.name,
          document_type: 'COA',
          file_url: publicUrl,
          status: 'Active'
        })
        .select()
        .single();

      if (docError) throw docError;

      // 4. Create Document Link
      await supabase.from('document_links').insert({
        document_id: docData.id,
        related_record_type: itemType,
        related_record_id: selectedItem.id
      });

      // Refresh docs
      setItemDocs(prev => [...prev, docData]);

    } catch (err: any) {
      console.error(err);
      alert("Failed to upload document: " + err.message);
    } finally {
      setIsUploading(false);
      // reset file input
      e.target.value = '';
    }
  };

  const handleUpdateQty = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      formData.append('item_id', selectedItem.id);
      formData.append('item_type', itemType);
      const res = await updateItemQuantity(formData);
      
      if (res?.error) {
        alert(`Error updating quantity: ${res.error}`);
        return;
      }

      setSelectedItem({ ...selectedItem, quantity_on_hand: Number(formData.get('quantity')) });
      setIsEditingQty(false);
      fetchData();
    } catch (err: any) {
      alert(`System Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!window.confirm(`Are you sure you want to delete this ${itemType}? This cannot be undone.`)) return;
    
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('item_id', selectedItem.id);
      fd.append('item_type', itemType);
      const res = await deleteItem(fd);
      
      if (res?.error) {
        alert(`Error deleting item: ${res.error}`);
        return;
      }

      setSelectedItem(null);
      fetchData();
    } catch (err: any) {
      alert(`System Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory & Purchasing</h1>
          <p className="text-subtle mt-1">Manage Raw Materials and Finished Goods</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowReceiveModal(true)} className="btn btn-secondary border-border-color">Receive Items</button>
          <button onClick={() => setShowPOModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New PO</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card border-warning-color/30 bg-warning-color/5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-warning-color">Low Stock Items</h3>
            <AlertTriangle className="h-4 w-4 text-warning-color" />
          </div>
          <p className="text-2xl font-bold text-warning-color">
            {materials.filter(m => m.quantity_on_hand <= (m.reorder_point || 0)).length}
          </p>
        </div>
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Incoming (POs)</h3>
            <ShoppingCart className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{purchaseOrders.filter(p => p.status === 'Submitted' || p.status === 'Approved').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 space-y-6">
          {/* Raw Materials */}
          <div className="card p-0 overflow-hidden">
            <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-500" />
                Raw Materials
              </h2>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color text-xs uppercase text-subtle">
                <tr>
                  <th className="px-4 py-3 font-medium">Material Name</th>
                  <th className="px-4 py-3 font-medium">On Hand</th>
                  <th className="px-4 py-3 font-medium">Reorder Pt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {materials.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => openItemDetails(row, 'Material')}
                    className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-3 font-medium group-hover:text-blue-500 transition-colors">{row.name}</td>
                    <td className="px-4 py-3 font-bold">{row.quantity_on_hand || 0} {row.unit_of_measure}</td>
                    <td className="px-4 py-3 text-subtle">{row.reorder_point || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Finished Goods */}
          <div className="card p-0 overflow-hidden">
            <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Box className="w-4 h-4 text-accent-color" />
                Finished Goods (Products)
              </h2>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color text-xs uppercase text-subtle">
                <tr>
                  <th className="px-4 py-3 font-medium">Product Name</th>
                  <th className="px-4 py-3 font-medium">On Hand</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {products.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => openItemDetails(row, 'Product')}
                    className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-3 font-medium group-hover:text-accent-color transition-colors">{row.name}</td>
                    <td className="px-4 py-3 font-bold">{row.quantity_on_hand || 0} units</td>
                    <td className="px-4 py-3 font-medium">${Number(row.sale_price).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <a 
                        href={`/print/label/product/${row.id}`} 
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-subtle hover:text-text-primary transition-colors"
                        title="Print 4x2 Product Label"
                      >
                        <Printer className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Active POs */}
        <section className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-accent-color" />
              Purchase Orders
            </h2>
          </div>
          <div className="space-y-3">
            {purchaseOrders.map((po) => (
              <div key={po.id} className="p-3 rounded-lg border border-border-color bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{po.po_number}</span>
                  <span className="text-xs font-medium text-accent-color">${Number(po.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-subtle">{po.vendors?.name || 'Unknown Vendor'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${po.status === 'Received' ? 'bg-green-500/10 text-green-500' : 'bg-black/5 dark:bg-white/10'}`}>{po.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NEW PO MODAL */}
      {showPOModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Purchase Order</h2>
              <button onClick={() => setShowPOModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleCreatePO} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vendor</label>
                <select name="vendor_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Vendor...</option>
                  {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Material to Order</label>
                <select name="material_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Material...</option>
                  {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input type="number" name="quantity" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Cost ($)</label>
                  <input type="number" step="0.01" name="total_amount" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary mt-4 py-2">
                {isSubmitting ? 'Creating...' : 'Submit PO'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RECEIVE ITEMS MODAL */}
      {showReceiveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Receive PO</h2>
              <button onClick={() => setShowReceiveModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleReceivePO} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Incoming PO</label>
                <select name="po_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select PO...</option>
                  {purchaseOrders.filter(p => p.status !== 'Received').map(p => (
                    <option key={p.id} value={p.id}>{p.po_number} - {p.vendors?.name}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-subtle">Receiving this PO will automatically update your Raw Material stock levels.</p>
              <button type="submit" disabled={isSubmitting} className="w-full btn bg-green-600 hover:bg-green-500 text-white mt-4 py-2">
                {isSubmitting ? 'Receiving...' : 'Mark as Received'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ITEM DETAILS & COA MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{selectedItem.name}</h2>
                <p className="text-sm text-subtle">{itemType} | SKU: {selectedItem.sku || 'N/A'}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-subtle hover:text-primary"><X className="w-6 h-6" /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-border-color flex justify-between items-center">
                <div>
                  <p className="text-sm text-subtle">Quantity on Hand</p>
                  {isEditingQty ? (
                    <form action={handleUpdateQty} className="flex gap-2 mt-1">
                      <input 
                        type="number" 
                        name="quantity" 
                        step="0.01"
                        defaultValue={selectedItem.quantity_on_hand || 0} 
                        className="w-24 bg-background border border-border-color rounded px-2 py-1 text-sm"
                        autoFocus
                      />
                      <button type="submit" disabled={isSubmitting} className="btn bg-green-600 hover:bg-green-500 text-white px-3 py-1 text-sm">Save</button>
                      <button type="button" onClick={() => setIsEditingQty(false)} className="btn btn-secondary px-3 py-1 text-sm border-border-color">Cancel</button>
                    </form>
                  ) : (
                    <p className="text-xl font-bold">{selectedItem.quantity_on_hand || 0} {selectedItem.unit_of_measure}</p>
                  )}
                </div>
                {!isEditingQty && (
                  <button onClick={() => setIsEditingQty(true)} className="p-2 text-subtle hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-border-color">
                <p className="text-sm text-subtle">Status</p>
                <p className="text-xl font-bold">{selectedItem.status || 'Active'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border-color pb-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent-color" />
                  Documents & COAs
                </h3>
                <label className="btn btn-secondary border-border-color cursor-pointer flex items-center gap-2 text-sm px-3 py-1.5">
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : 'Upload COA'}
                  <input 
                    type="file" 
                    accept=".pdf,image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    disabled={isUploading}
                  />
                </label>
              </div>
              
              {itemDocs.length === 0 ? (
                <p className="text-subtle text-sm italic text-center py-8 bg-black/5 dark:bg-white/5 rounded-lg border border-dashed border-border-color">
                  No documents attached to this {itemType}.
                </p>
              ) : (
                <div className="space-y-2">
                  {itemDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border-color bg-background">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-subtle" />
                        <div>
                          <p className="text-sm font-medium">{doc.document_name}</p>
                          <p className="text-xs text-subtle">Type: {doc.document_type}</p>
                        </div>
                      </div>
                      <a 
                        href={doc.file_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md text-subtle hover:text-accent-color transition-colors"
                        title="View Document"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {itemType === 'Product' && (
              <div className="mt-8 pt-6 border-t border-border-color">
                <a 
                  href={`/print/label/product/${selectedItem.id}`} 
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn btn-primary py-3 flex justify-center items-center gap-2"
                >
                  <Printer className="w-5 h-5" /> 
                  Print 4x2 Product Label (with QR Code)
                </a>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border-color flex justify-end">
              <button 
                onClick={handleDeleteItem}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                {isSubmitting ? 'Deleting...' : `Delete ${itemType}`}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
