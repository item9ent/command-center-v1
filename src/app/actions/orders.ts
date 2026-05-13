"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

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

export async function createSalesOrder(formData: FormData) {
  const supabase = await getSupabase();
  const { companyId, userId } = await getAuthContext(supabase);
  
  const customerId = formData.get('customer_id') as string;
  const productId = formData.get('product_id') as string;
  const quantity = parseFloat(formData.get('quantity') as string) || 0;
  const totalAmount = parseFloat(formData.get('total_amount') as string) || 0;
  
  const orderNumber = `SO-${Math.floor(1000 + Math.random() * 9000)}`;

  // 1. Create the Sales Order
  const { data: order, error } = await supabase.from('sales_orders').insert({
    company_id: companyId,
    customer_id: customerId,
    order_number: orderNumber,
    status: 'Pending',
    total_amount: totalAmount,
    created_by: userId
  }).select('id').single();

  if (error) throw error;

  // 2. Create the Line Item
  await supabase.from('line_items').insert({
    company_id: companyId,
    sales_order_id: order.id,
    product_id: productId,
    description: 'Finished Product Order',
    quantity: quantity,
    unit_price: quantity > 0 ? (totalAmount / quantity) : 0,
    total_price: totalAmount
  });

  revalidatePath('/orders');
}

export async function updateOrderStatus(formData: FormData) {
  const supabase = await getSupabase();
  const orderId = formData.get('order_id') as string;
  const newStatus = formData.get('status') as string;

  // 1. Update the Order Status
  const { error } = await supabase.from('sales_orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) throw error;

  // 2. If Shipped, Deduct Inventory
  if (newStatus === 'Shipped') {
    const { data: lineItems } = await supabase.from('line_items')
      .select('product_id, quantity')
      .eq('sales_order_id', orderId);

    if (lineItems) {
      for (const item of lineItems) {
        if (item.product_id) {
          // Get current quantity
          const { data: product } = await supabase.from('products').select('quantity_on_hand').eq('id', item.product_id).single();
          
          // Deduct
          await supabase.from('products')
            .update({ quantity_on_hand: Math.max(0, (product?.quantity_on_hand || 0) - item.quantity) })
            .eq('id', item.product_id);
        }
      }
    }
  }

  revalidatePath('/orders');
}
