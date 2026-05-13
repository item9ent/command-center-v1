const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.SHIPSTATION_API_KEY;
  const apiSecret = process.env.SHIPSTATION_API_SECRET;
  const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  
  const labelPayload = {
    orderId: 304990714,
    carrierCode: "stamps_com",
    serviceCode: "usps_priority_mail",
    packageCode: "package",
    confirmation: "none",
    shipDate: new Date().toISOString().split('T')[0],
    weight: { value: 16, units: "ounces" },
    testLabel: true
  };

  const labelRes = await globalThis.fetch('https://ssapi.shipstation.com/orders/createlabelfororder', { 
    method: 'POST',
    headers: { 'Authorization': `Basic ${authString}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(labelPayload)
  });
  
  const result = await labelRes.json();
  fs.writeFileSync('test_label_original.pdf', Buffer.from(result.labelData, 'base64'));
  console.log("Saved test_label_original.pdf");
}
run().catch(console.error);
