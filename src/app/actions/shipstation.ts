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
    const cookieStore = await cookies();
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
    const { error: insertError } = await supabase.from('shipping_records').insert({
      company_id: order.company_id,
      sales_order_id: salesOrderId,
      shipstation_order_id: result.orderId.toString(),
      status: 'Pending'
    });
    
    if (insertError) console.error("Failed to insert shipping_record:", insertError);

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

/**
 * Purchases postage and generates a shipping label PDF for an order
 */
export async function generateShippingLabel(
  salesOrderId: string, 
  carrierCode: string, 
  serviceCode: string, 
  weightValue: number,
  weightUnit: 'ounces' | 'grams' | 'pounds' = 'ounces',
  testLabel: boolean = false
) {
  try {
    const cookieStore = await cookies();
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

    // 1. First, check if a ShipStation order already exists for this Sales Order
    let shipStationOrderId: number | null = null;
    const { data: existingRecord } = await supabase
      .from('shipping_records')
      .select('*')
      .eq('sales_order_id', salesOrderId)
      .single();

    if (existingRecord?.shipstation_order_id) {
      shipStationOrderId = parseInt(existingRecord.shipstation_order_id);
    } else {
      // 2. If it doesn't exist in ShipStation yet, push the order over first
      const createRes = await createShipStationOrder(salesOrderId);
      if (!createRes.success || !createRes.shipStationOrderId) {
        throw new Error(createRes.error || 'Failed to create parent order in ShipStation');
      }
      shipStationOrderId = createRes.shipStationOrderId;
    }

    // 3. Request the Label from ShipStation API
    const labelPayload = {
      orderId: shipStationOrderId,
      carrierCode: carrierCode,
      serviceCode: serviceCode,
      packageCode: "package", // Standard package
      confirmation: "none",
      shipDate: new Date().toISOString().split('T')[0], // Today
      weight: {
        value: weightValue,
        units: weightUnit
      },
      testLabel: testLabel // If true, does not charge billing account
    };

    const response = await fetch(`${SHIPSTATION_API_URL}/orders/createlabelfororder`, {
      method: 'POST',
      headers: getShipStationHeaders(),
      body: JSON.stringify(labelPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ShipStation Label Error:', errorText);
      
      // Try to parse JSON error if possible
      let friendlyError = response.statusText;
      try {
        const errObj = JSON.parse(errorText);
        friendlyError = errObj.ExceptionMessage || errObj.Message || friendlyError;
      } catch (e) {}

      throw new Error(`ShipStation Error: ${friendlyError}`);
    }

    const result = await response.json();
    
    // 4. Update the shipping record in Supabase to 'Shipped'
    const { error: updateError } = await supabase.from('shipping_records')
      .update({ 
        status: 'Label Generated', 
        tracking_number: result.trackingNumber,
        label_data: result.labelData // base64 pdf
      })
      .eq('sales_order_id', salesOrderId);
      
    if (updateError) console.error("Failed to update shipping_record:", updateError);

    // 5. Update the Sales Order status to 'Shipped'
    await supabase.from('sales_orders')
      .update({ status: 'Shipped' })
      .eq('id', salesOrderId);

    return { 
      success: true, 
      trackingNumber: result.trackingNumber, 
      labelData: result.labelData // Base64 PDF String
    };

  } catch (error: any) {
    console.error('ShipStation Label Generation Error:', error);
    return { success: false, error: error.message };
  }
}
