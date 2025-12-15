import { NextRequest, NextResponse } from 'next/server';
import { supabase, TENANT_ID, PROJECT_ID } from '@/lib/supabase/client';
import { CreateOrderData } from '@/lib/supabase/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderData = await request.json();

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        order_number: body.orderNumber,
        customer_name: body.fullName,
        customer_phone: body.phone,
        customer_address: body.address,
        plate_number: body.plateNumber,
        vehicle_type: body.vehicleType,
        plate_type: body.plateType,
        plate_shape: body.plateShape,
        dimensions: body.dimensions,
        total_price: body.totalPrice,
        additional_notes: body.additionalNotes || null,
        order_data: body.orderData || body,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError },
        { status: 500 }
      );
    }

    // Trigger notifications
    try {
      await fetch(`${request.nextUrl.origin}/api/notifications/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: order.id,
          orderNumber: body.orderNumber,
          customerName: body.fullName,
          customerPhone: body.phone,
          plateNumber: body.plateNumber,
          totalPrice: body.totalPrice,
          vehicleType: body.vehicleType,
          plateType: body.plateType
        })
      });
    } catch (notifError) {
      console.error('Error sending notifications:', notifError);
      // Don't fail the order creation if notifications fail
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
