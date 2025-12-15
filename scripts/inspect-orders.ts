import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IkNUbllzSnQ3djNoZ2Vxd2p1VFV0Q2hrSnVSdjEiLCJwcm9qZWN0X2lkIjoiYzVlMTQzODgtMDc3ZS00YjBjLWJlMWQtNjk1ZjNkYTgyZWNkIiwianRpIjoiZWEyYjY3MTAtOTM0Yi00MjJkLTk0NmEtZTgyYThkM2U4NzQ3IiwiaWF0IjoxNzY1NzY3OTIxLCJleHAiOjE3NjU3NzA2MjF9.CSNR_oE9ymJPtKw0IL_KfIW-EYNafk2ilTJGqamGzvQ`
      }
    }
  }
);

async function inspectOrders() {
  console.log('=== ORDERS TABLE INSPECTION ===\n');

  const { data: samples, error } = await supabase
    .from('orders')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching orders:', error);
    return;
  }

  if (!samples || samples.length === 0) {
    console.log('No orders found in database');
    console.log('\nLet me check the table structure...\n');

    // Check columns
    const { data: columns } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'orders')
      .eq('table_schema', 'public')
      .order('ordinal_position');

    if (columns && columns.length > 0) {
      console.log('Orders table columns:');
      columns.forEach((col: any) => {
        console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : 'nullable'}`);
      });
    }
  } else {
    console.log('Sample order:', JSON.stringify(samples[0], null, 2));
    console.log('\nColumns:', Object.keys(samples[0]).join(', '));
  }
}

inspectOrders();
