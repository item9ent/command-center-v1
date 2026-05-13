const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function escapeSql(str) {
  if (!str) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function processCustomers() {
  const wb = xlsx.readFile('Import Data/Customers.xls');
  const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  
  let sql = `-- ==========================================\n`;
  sql += `-- IMPORT CUSTOMERS\n`;
  sql += `-- ==========================================\n\n`;

  for (const row of data) {
    const name = row['Name'] || row['Company name'];
    if (!name) continue;

    const email = row['Email'] || '';
    const phone = row['Phone'] || '';
    const type = row['Customer type'] || '';
    
    // Combine address
    const addrParts = [];
    if (row['Street Address']) addrParts.push(row['Street Address']);
    if (row['City']) addrParts.push(row['City']);
    if (row['State']) addrParts.push(row['State']);
    if (row['Zip']) addrParts.push(row['Zip']);
    if (row['Country']) addrParts.push(row['Country']);
    const fullAddress = addrParts.join(', ');

    sql += `INSERT INTO customers (company_id, name, email, phone, billing_address, customer_type) \n`;
    sql += `VALUES ((SELECT id FROM companies LIMIT 1), ${escapeSql(name)}, ${escapeSql(email)}, ${escapeSql(phone)}, ${escapeSql(fullAddress)}, ${escapeSql(type)});\n\n`;
  }
  return sql;
}

function processVendors() {
  const wb = xlsx.readFile('Import Data/Vendors.xls');
  const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  
  let sql = `-- ==========================================\n`;
  sql += `-- IMPORT VENDORS\n`;
  sql += `-- ==========================================\n\n`;

  for (const row of data) {
    const name = row['Vendor'] || row['Company name'];
    if (!name) continue;

    const email = row['Email'] || '';
    const phone = row['Phone'] || '';
    
    // Combine address
    const addrParts = [];
    if (row['Street Address']) addrParts.push(row['Street Address']);
    if (row['City']) addrParts.push(row['City']);
    if (row['State']) addrParts.push(row['State']);
    if (row['Zip']) addrParts.push(row['Zip']);
    if (row['Country']) addrParts.push(row['Country']);
    const fullAddress = addrParts.join(', ');

    sql += `INSERT INTO vendors (company_id, name, email, phone, billing_address) \n`;
    sql += `VALUES ((SELECT id FROM companies LIMIT 1), ${escapeSql(name)}, ${escapeSql(email)}, ${escapeSql(phone)}, ${escapeSql(fullAddress)});\n\n`;
  }
  return sql;
}

try {
  console.log("Generating SQL...");
  let finalSql = processCustomers();
  finalSql += processVendors();
  
  fs.writeFileSync('supabase/migrations/import_legacy_data.sql', finalSql);
  console.log("SQL generated at supabase/migrations/import_legacy_data.sql!");
} catch (e) {
  console.error("Error generating SQL:", e);
}
