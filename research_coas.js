require('dotenv').config({ path: '/Users/itemnineenterprises/Desktop/command-center/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const coasDir = '/Users/itemnineenterprises/Desktop/command-center/COAS copy';
  const files = fs.readdirSync(coasDir).filter(f => f.endsWith('.pdf'));
  
  const { data: products } = await supabase.from('products').select('id, name');
  const { data: materials } = await supabase.from('materials').select('id, name');
  
  console.log(`Found ${files.length} COA files`);
  console.log(`Found ${products?.length || 0} Products and ${materials?.length || 0} Materials in DB`);
  
  // Basic matching attempt
  let matched = 0;
  for (const file of files) {
    // e.g., "SA-260504-80786 Item Nine Enterprises LLC GF Flower.pdf"
    const cleanedName = file.replace(/SA-\d+-\d+\s+Item Nine Enterprises LLC\s+/i, '').replace(/\.pdf$/i, '').trim().toLowerCase();
    
    let match = null;
    let matchType = null;
    
    if (products) {
      match = products.find(p => p.name.toLowerCase().includes(cleanedName) || cleanedName.includes(p.name.toLowerCase()));
      if (match) matchType = 'Product';
    }
    
    if (!match && materials) {
      match = materials.find(m => m.name.toLowerCase().includes(cleanedName) || cleanedName.includes(m.name.toLowerCase()));
      if (match) matchType = 'Material';
    }
    
    if (match) {
      matched++;
      console.log(`[MATCH] ${file}  -->  ${matchType}: ${match.name}`);
    } else {
      console.log(`[UNMATCHED] ${file} (Cleaned: ${cleanedName})`);
    }
  }
  
  console.log(`Matched ${matched} out of ${files.length} files`);
}

run().catch(console.error);
