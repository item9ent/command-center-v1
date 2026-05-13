require('dotenv').config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.SHIPSTATION_API_KEY;
  const apiSecret = process.env.SHIPSTATION_API_SECRET;
  
  const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${authString}`,
    'Content-Type': 'application/json',
  };

  const labelPayload = {
    orderId: 304990714,
    carrierCode: "stamps_com",
    serviceCode: "usps_priority_mail",
    packageCode: "package",
    confirmation: "none",
    shipDate: new Date().toISOString().split('T')[0],
    weight: {
      value: 16,
      units: "ounces"
    },
    testLabel: true
  };

  const labelRes = await globalThis.fetch('https://ssapi.shipstation.com/orders/createlabelfororder', { 
    method: 'POST',
    headers,
    body: JSON.stringify(labelPayload)
  });
  
  const responseText = await labelRes.text();
  console.log("STATUS:", labelRes.status);
  console.log("RESPONSE:", responseText);
}

run().catch(console.error);
