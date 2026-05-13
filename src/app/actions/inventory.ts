"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

// Ensure the user's company ID is automatically injected
async function getAuthContext(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data: userRecord } = await supabase
    .from('users')
    .select('company_id')
    .eq('id', user.id)
    .single();
    
  return { companyId: userRecord?.company_id, userId: user.id };
}

export async function createPurchaseOrder(formData: FormData) {
  const supabase = await createClient();
  const { companyId, userId } = await getAuthContext(supabase);
  
  const vendorId = formData.get('vendor_id') as string;
  const materialId = formData.get('material_id') as string; // Which material we are buying
  const quantity = parseFloat(formData.get('quantity') as string) || 0;
  const totalAmount = parseFloat(formData.get('total_amount') as string) || 0;
  
  const poNumber = `PO-${Math.floor(1000 + Math.random() * 9000)}`;

  // 1. Create the PO
  const { data: po, error } = await supabase.from('purchase_orders').insert({
    company_id: companyId,
    vendor_id: vendorId,
    po_number: poNumber,
    status: 'Submitted',
    total_amount: totalAmount,
    created_by: userId
  }).select('id').single();

  if (error) throw error;

  // 2. Create the Line Item (so we know what was ordered)
  await supabase.from('line_items').insert({
    company_id: companyId,
    purchase_order_id: po.id,
    material_id: materialId,
    description: 'Raw Material Order',
    quantity: quantity,
    unit_price: quantity > 0 ? (totalAmount / quantity) : 0,
    total_price: totalAmount
  });

  revalidatePath('/inventory');
}

export async function receivePurchaseOrder(formData: FormData) {
  const supabase = await createClient();
  const poId = formData.get('po_id') as string;
  
  // 1. Mark PO as Received
  await supabase.from('purchase_orders')
    .update({ status: 'Received' })
    .eq('id', poId);

  // 2. Find what material was on this PO and how much
  const { data: lineItems } = await supabase.from('line_items')
    .select('material_id, quantity')
    .eq('purchase_order_id', poId);

  // 3. Update inventory levels for each line item
  if (lineItems) {
    for (const item of lineItems) {
      if (item.material_id) {
        // We have to get current quantity first
        const { data: mat } = await supabase.from('materials').select('quantity_on_hand').eq('id', item.material_id).single();
        
        await supabase.from('materials')
          .update({ quantity_on_hand: (mat?.quantity_on_hand || 0) + item.quantity })
          .eq('id', item.material_id);
      }
    }
  }

  revalidatePath('/inventory');
}

export async function updateItemQuantity(formData: FormData) {
  const supabase = await createClient();
  const { companyId } = await getAuthContext(supabase);
  
  const itemId = formData.get('item_id') as string;
  const itemType = formData.get('item_type') as string; // 'Product' or 'Material'
  const newQty = parseFloat(formData.get('quantity') as string) || 0;

  const table = itemType === 'Product' ? 'products' : 'materials';

  const { error } = await supabase
    .from(table)
    .update({ quantity_on_hand: newQty })
    .eq('id', itemId)
    .eq('company_id', companyId); // Extra safety check

  if (error) throw new Error(error.message);

  revalidatePath('/inventory');
}

export async function deleteItem(formData: FormData) {
  const supabase = await createClient();
  const { companyId } = await getAuthContext(supabase);
  
  const itemId = formData.get('item_id') as string;
  const itemType = formData.get('item_type') as string; // 'Product' or 'Material'

  const table = itemType === 'Product' ? 'products' : 'materials';

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', itemId)
    .eq('company_id', companyId); // Extra safety check

  if (error) {
    if (error.message.includes('foreign key constraint')) {
      throw new Error(`Cannot delete this ${itemType} because it is currently being used in active recipes, orders, or bills of material.`);
    }
    throw new Error(error.message);
  }

  revalidatePath('/inventory');
}
