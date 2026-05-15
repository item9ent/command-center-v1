"use client";

import { useState } from 'react';
import { Settings, Users, Package, Factory, Briefcase, Plus, Save, Loader2 } from 'lucide-react';
import { addCustomer, addMaterial, addProduct, addEmployee, addVendor } from '@/app/actions/master-data';

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState<'customers' | 'vendors' | 'materials' | 'products' | 'employees'>('customers');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (action: Function, formData: FormData) => {
    setIsSubmitting(true);
    try {
      await action(formData);
      alert('Record added successfully!');
      (document.getElementById(`${activeTab}Form`) as HTMLFormElement)?.reset();
    } catch (err: any) {
      alert(`Error saving record: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Settings className="w-8 h-8 text-accent-color" />
            Master Data & Settings
          </h1>
          <p className="text-subtle mt-1">Foundational data entry for ENHAZED OS</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 space-y-2 shrink-0">
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'customers' ? 'bg-accent-color text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-subtle'}`}
          >
            <Briefcase className="w-5 h-5" />
            Customers
          </button>
          <button 
            onClick={() => setActiveTab('vendors')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'vendors' ? 'bg-accent-color text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-subtle'}`}
          >
            <Briefcase className="w-5 h-5" />
            Vendors & Suppliers
          </button>
          <button 
            onClick={() => setActiveTab('materials')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'materials' ? 'bg-accent-color text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-subtle'}`}
          >
            <Package className="w-5 h-5" />
            Raw Materials
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'products' ? 'bg-accent-color text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-subtle'}`}
          >
            <Factory className="w-5 h-5" />
            Finished Products
          </button>
          <button 
            onClick={() => setActiveTab('employees')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'employees' ? 'bg-accent-color text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-subtle'}`}
          >
            <Users className="w-5 h-5" />
            Employees
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card-bg border border-border-color rounded-xl p-6">
          
          {/* Customers Form */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl font-semibold text-primary border-b border-border-color pb-4">Add New Customer</h3>
              <form id="customersForm" action={(fd) => handleSubmit(addCustomer, fd)} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Company / Customer Name</label>
                  <input required name="name" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Customer Type</label>
                  <select name="type" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color">
                    <option value="B2B">B2B Wholesale</option>
                    <option value="Retail">Retail</option>
                    <option value="Distributor">Distributor</option>
                  </select>
                </div>
                
                <h4 className="text-sm font-semibold text-accent-color mt-6 mb-2">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Email</label>
                    <input name="email" type="email" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Preferred Contact Method</label>
                  <select name="preferred_contact_method" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color">
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text Message</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Billing Address</label>
                    <textarea name="billing_address" rows={2} className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Shipping Address</label>
                    <textarea name="shipping_address" rows={2} className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color"></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Payment Terms</label>
                  <input name="payment_terms" type="text" placeholder="e.g. Net 30" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                </div>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-accent-color text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-color/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Customer
                </button>
              </form>
            </div>
          )}

          {/* Vendors Form */}
          {activeTab === 'vendors' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl font-semibold text-primary border-b border-border-color pb-4">Add New Vendor</h3>
              <form id="vendorsForm" action={(fd) => handleSubmit(addVendor, fd)} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Vendor / Supplier Name</label>
                  <input required name="name" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Vendor Type</label>
                  <select name="vendor_type" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color">
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Service">Service / Software</option>
                  </select>
                </div>
                
                <h4 className="text-sm font-semibold text-accent-color mt-6 mb-2">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Email</label>
                    <input name="email" type="email" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Preferred Contact Method</label>
                  <select name="preferred_contact_method" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color">
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text Message</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Billing Address</label>
                    <textarea name="billing_address" rows={2} className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Shipping Address</label>
                    <textarea name="shipping_address" rows={2} className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color"></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Payment Terms</label>
                  <input name="payment_terms" type="text" placeholder="e.g. Net 30, Due on Receipt" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                </div>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-accent-color text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-color/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Vendor
                </button>
              </form>
            </div>
          )}

          {/* Materials Form */}
          {activeTab === 'materials' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl font-semibold text-primary border-b border-border-color pb-4">Add Raw Material</h3>
              <form id="materialsForm" action={(fd) => handleSubmit(addMaterial, fd)} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">SKU (Optional)</label>
                    <input name="sku" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Material Name</label>
                    <input required name="name" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Category</label>
                    <input name="category" type="text" placeholder="e.g. Solvents, Biomass" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Unit of Measure</label>
                    <input required name="unit_of_measure" type="text" placeholder="e.g. Liters, kg, lbs" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Cost per Unit ($)</label>
                    <input name="cost_per_unit" type="number" step="0.01" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Min. Stock Level</label>
                    <input name="minimum_stock_level" type="number" step="0.1" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-accent-color text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-color/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Material
                </button>
              </form>
            </div>
          )}

          {/* Products Form */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl font-semibold text-primary border-b border-border-color pb-4">Add Finished Product</h3>
              <form id="productsForm" action={(fd) => handleSubmit(addProduct, fd)} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Product SKU</label>
                    <input required name="sku" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Product Name</label>
                    <input required name="name" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Category</label>
                  <input name="category" type="text" placeholder="e.g. Concentrates, Edibles" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-subtle mb-1">Base Retail Price ($)</label>
                  <input name="base_price" type="number" step="0.01" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                </div>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-accent-color text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-color/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Product
                </button>
              </form>
            </div>
          )}

          {/* Employees Form */}
          {activeTab === 'employees' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl font-semibold text-primary border-b border-border-color pb-4">Add Employee</h3>
              <form id="employeesForm" action={(fd) => handleSubmit(addEmployee, fd)} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">First Name</label>
                    <input required name="first_name" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Last Name</label>
                    <input required name="last_name" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                </div>
                
                {/* ENHAZED OS Access Section */}
                <div className="bg-accent-color/5 border border-accent-color/20 rounded-lg p-4 space-y-4">
                  <h4 className="text-sm font-semibold text-accent-color flex items-center gap-2">
                    ENHAZED OS Login (Optional)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-subtle mb-1">Email Address</label>
                      <input name="email" type="email" placeholder="Required for access" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-3 py-1.5 text-primary text-sm focus:outline-none focus:border-accent-color" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-subtle mb-1">Temporary Password</label>
                      <input name="password" type="text" placeholder="e.g. Welcome123!" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-3 py-1.5 text-primary text-sm focus:outline-none focus:border-accent-color" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-subtle mb-1">Access Level (Role)</label>
                    <select name="role" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-3 py-1.5 text-primary text-sm focus:outline-none focus:border-accent-color">
                      <option value="Floor Staff">Floor Staff</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                
                <h4 className="text-sm font-semibold text-accent-color mt-6 mb-2">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Personal Email (If different)</label>
                    <input name="email" type="email" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Home Address</label>
                    <textarea name="address" rows={1} className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Preferred Contact</label>
                    <select name="preferred_contact_method" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color">
                      <option value="Text">Text Message</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-accent-color mt-6 mb-2">Employment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Job Title</label>
                    <input name="job_title" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Department</label>
                    <input name="department" type="text" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-color" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Status</label>
                    <select name="employment_status" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contractor">Contractor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-subtle mb-1">Hourly Rate ($)</label>
                    <input name="hourly_rate" type="number" step="0.50" className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-lg px-4 py-2 text-primary" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-accent-color text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-color/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Employee
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
