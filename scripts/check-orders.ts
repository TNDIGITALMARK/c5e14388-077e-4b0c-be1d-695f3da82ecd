/**
 * Check Orders Script
 *
 * View recent orders in the database
 */

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

async function checkOrders() {
  console.log('📦 Checking orders in database...\n');

  try {
    const { data: orders, error, count } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      if (error.code === 'PGRST204' || error.message.includes('Could not find the table')) {
        console.log('❌ Orders table does not exist');
        console.log('\n⚠️  Please run the database initialization script:');
        console.log('   npx tsx scripts/init-database.ts');
        console.log('\n   Then manually run the SQL in Supabase SQL Editor');
        return;
      }

      console.error('❌ Error fetching orders:', error);
      return;
    }

    if (!orders || orders.length === 0) {
      console.log('📭 No orders found in database');
      console.log('\n✨ Place a test order to see it here:');
      console.log('   http://localhost:3000/builder');
      return;
    }

    console.log(`✅ Found ${count} total orders\n`);
    console.log('Recent Orders:\n');

    orders.forEach((order, index) => {
      console.log(`${index + 1}. Order #${order.order_number}`);
      console.log(`   Customer: ${order.customer_name}`);
      console.log(`   Phone: ${order.customer_phone}`);
      console.log(`   Plate: ${order.plate_number}`);
      console.log(`   Vehicle: ${order.vehicle_type}`);
      console.log(`   Type: ${order.plate_type}`);
      console.log(`   Price: Rs ${order.total_price}`);
      console.log(`   Status: ${order.status}`);
      console.log(`   Created: ${new Date(order.created_at).toLocaleString()}`);
      console.log('');
    });

    // Check notification settings
    console.log('🔔 Checking notification settings...\n');

    const { data: settings, error: settingsError } = await supabase
      .from('notification_settings')
      .select('*')
      .single();

    if (settingsError && settingsError.code !== 'PGRST116') {
      console.log('❌ Error fetching notification settings:', settingsError.message);
      console.log('⚠️  The notification_settings table may not exist');
    } else if (!settings) {
      console.log('⚠️  No notification settings configured');
      console.log('   Configure at: http://localhost:3000/admin/notifications');
    } else {
      console.log('✅ Notification Settings:');
      console.log(`   Email: ${settings.email_enabled ? '✅ Enabled' : '❌ Disabled'}`);
      if (settings.email_enabled) {
        console.log(`   Email Address: ${settings.email_address}`);
      }
      console.log(`   WhatsApp: ${settings.whatsapp_enabled ? '✅ Enabled' : '❌ Disabled'}`);
      if (settings.whatsapp_enabled) {
        console.log(`   WhatsApp Number: ${settings.whatsapp_number}`);
      }
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

checkOrders();
