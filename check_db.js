const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDb() {
  console.log("Checking DB connection...");
  const { data, error } = await supabase.from('companies').select('*').limit(1);
  if (error) {
    console.error("Error querying 'companies' table:", error.message);
  } else {
    console.log("Successfully queried 'companies' table. Data:", data);
  }
}

checkDb();
