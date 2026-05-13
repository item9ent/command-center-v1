"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SHIPSTATION_API_URL = 'https://ssapi.shipstation.com';

function getShipStationHeaders() {
  const apiKey = process.env.SHIPSTATION_API_KEY;
  const apiSecret = process.env.SHIPSTATION_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    throw new Error('ShipStation API credentials are not configured');
  }

  // Basic auth is base64(apiKey:apiSecret)
  const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  
  return {
    'Authorization': `Basic ${authString}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Creates an order in ShipStation based on an ENHAZED OS Sales Order
 */
export async function createShipStationOrder(salesOrderId: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
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

    // 1. Fetch Sales Order Data
    const { data: order, error } = await supabase
      .from('sales_orders')
      .select(`
        *,
        customer:customers(*),
        line_items(*, product:products(*))
      `)
      .eq('id', salesOrderId)
      .single();

    if (error || !order) throw new Error('Sales order not found');

    // 2. Format the payload for ShipStation
    const shipStationPayload = {
      orderNumber: order.order_number,
      orderDate: new Date(order.created_at).toISOString(),
      orderStatus: 'awaiting_shipment',
      customerUsername: order.customer.name,
      customerEmail: order.customer.email || 'customer@example.com',
      billTo: {
        name: order.customer.name,
        company: order.customer.name,
        street1: order.customer.address || '123 Main St',
        city: 'City',
        state: 'ST',
        postalCode: '12345',
        country: 'US',
        phone: order.customer.phone || '555-555-5555'
      },
      shipTo: {
        name: order.customer.name,
        company: order.customer.name,
        street1: order.customer.address || '123 Main St',
        city: 'City',
        state: 'ST',
        postalCode: '12345',
        country: 'US',
        phone: order.customer.phone || '555-555-5555'
      },
      items: order.line_items.map((item: any) => ({
        lineItemKey: item.id,
        sku: item.product?.sku || 'UNKNOWN-SKU',
        name: item.description,
        weight: {
          value: item.product?.unit_weight_kg || 1,
          units: 'grams'
        },
        quantity: item.quantity,
        unitPrice: item.unit_price
      }))
    };

    // 3. Send to ShipStation
    const response = await fetch(`${SHIPSTATION_API_URL}/orders/createorder`, {
      method: 'POST',
      headers: getShipStationHeaders(),
      body: JSON.stringify(shipStationPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ShipStation Error:', errorText);
      throw new Error(`Failed to create order in ShipStation: ${response.statusText}`);
    }

    const result = await response.json();

    // 4. Record in Supabase shipping_records
    await supabase.from('shipping_records').insert({
      sales_order_id: salesOrderId,
      shipstation_order_id: result.orderId.toString(),
      status: 'Pending'
    });

    return { success: true, shipStationOrderId: result.orderId };

  } catch (error: any) {
    console.error('ShipStation Integration Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches Carriers from ShipStation
 */
export async function getCarriers() {
  try {
    const response = await fetch(`${SHIPSTATION_API_URL}/carriers`, {
      headers: getShipStationHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch carriers');
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return [];
  }
}
