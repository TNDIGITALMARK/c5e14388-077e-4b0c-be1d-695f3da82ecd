import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

interface NotificationPayload {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  plateNumber: string;
  totalPrice: number;
  vehicleType: string;
  plateType: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: NotificationPayload = await request.json();

    // Get notification settings
    const { data: settings, error: settingsError } = await supabase
      .from('notification_settings')
      .select('*')
      .single();

    if (settingsError) {
      console.error('No notification settings found:', settingsError);
      // Continue anyway - default to manual notifications
    }

    const notifications: Array<{ type: string; status: string; error?: string }> = [];

    // Email notification
    if (settings?.email_enabled && settings.email_address) {
      try {
        const emailResult = await sendEmailNotification(settings.email_address, payload);
        notifications.push({ type: 'email', status: emailResult.success ? 'sent' : 'failed', error: emailResult.error });
      } catch (error: any) {
        notifications.push({ type: 'email', status: 'failed', error: error.message });
      }
    }

    // WhatsApp notification
    if (settings?.whatsapp_enabled && settings.whatsapp_number) {
      try {
        const whatsappResult = await sendWhatsAppNotification(settings.whatsapp_number, payload);
        notifications.push({ type: 'whatsapp', status: whatsappResult.success ? 'sent' : 'failed', error: whatsappResult.error });
      } catch (error: any) {
        notifications.push({ type: 'whatsapp', status: 'failed', error: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      notifications,
      message: notifications.length === 0
        ? 'No notifications configured'
        : `Sent ${notifications.filter(n => n.status === 'sent').length} of ${notifications.length} notifications`
    });
  } catch (error: any) {
    console.error('Error sending notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications', details: error.message },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(
  emailAddress: string,
  payload: NotificationPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    // For demonstration, we'll use a simple email service
    // In production, integrate with SendGrid, Resend, or similar

    const subject = `New Order: ${payload.orderNumber}`;
    const body = `
New PlaqueXpress Order Received!

Order Number: ${payload.orderNumber}
Customer: ${payload.customerName}
Phone: ${payload.customerPhone}
Plate Number: ${payload.plateNumber}
Vehicle Type: ${payload.vehicleType}
Plate Type: ${payload.plateType}
Total: Rs ${payload.totalPrice}

Login to view full details.
    `.trim();

    // Use a simple email API or service
    // For now, log it (replace with actual email service)
    console.log('Email notification:', { to: emailAddress, subject, body });

    // TODO: Integrate actual email service
    // Example: await resend.emails.send({ from: '...', to: emailAddress, subject, text: body });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

async function sendWhatsAppNotification(
  whatsappNumber: string,
  payload: NotificationPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    // Format message for WhatsApp
    const message = `
🔔 *New PlaqueXpress Order*

📋 Order: ${payload.orderNumber}
👤 Customer: ${payload.customerName}
📞 Phone: ${payload.customerPhone}
🚗 Plate: ${payload.plateNumber}
🚙 Vehicle: ${payload.vehicleType}
🎨 Type: ${payload.plateType}
💰 Total: Rs ${payload.totalPrice}
    `.trim();

    // Use WhatsApp Business API or service
    // For now, log it (replace with actual WhatsApp service)
    console.log('WhatsApp notification:', { to: whatsappNumber, message });

    // TODO: Integrate WhatsApp Business API
    // Example options:
    // 1. Twilio WhatsApp API
    // 2. WhatsApp Business API
    // 3. Third-party services like WA.me links

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
