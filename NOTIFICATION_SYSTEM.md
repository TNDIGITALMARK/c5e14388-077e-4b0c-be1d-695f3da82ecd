# Order Notification System

This document explains the order notification system that sends alerts via email and WhatsApp when customers place orders.

## Features

✅ **Database Order Tracking** - All orders are saved to a Supabase database
✅ **Email Notifications** - Receive order details via email
✅ **WhatsApp Notifications** - Get instant alerts on WhatsApp
✅ **Admin Settings Page** - Configure notification preferences
✅ **Automatic Triggers** - Notifications sent immediately when orders are placed

## Architecture

### Components

1. **Database Tables**
   - `orders` - Stores all customer orders with full details
   - `notification_settings` - Stores email and WhatsApp preferences

2. **API Routes**
   - `/api/orders` (POST) - Creates new orders and triggers notifications
   - `/api/orders` (GET) - Retrieves order history
   - `/api/notifications/send` (POST) - Sends email/WhatsApp notifications
   - `/api/notifications/settings` (GET/POST) - Manages notification preferences

3. **Pages**
   - `/checkout` - Updated to save orders to database automatically
   - `/admin/notifications` - Admin page to configure notification settings

### Flow

```
Customer completes order
    ↓
Checkout page saves to sessionStorage
    ↓
Order saved to database via /api/orders
    ↓
API triggers /api/notifications/send
    ↓
Notifications sent to configured email/WhatsApp
```

## Setup Instructions

### 1. Initialize Database

The database tables need to be created in your Supabase project. Run the initialization script:

```bash
npx tsx scripts/init-database.ts
```

**Important:** The script will guide you to manually run the SQL in the Supabase SQL Editor:

1. Go to your Supabase project SQL Editor: https://hfndfmtxhqvubnfiwzlz.supabase.co/project/_/sql
2. Copy the contents of `scripts/init-database.sql`
3. Paste and run in the SQL editor
4. Verify the tables are created

This creates two tables:
- `orders` - Stores order information
- `notification_settings` - Stores email/WhatsApp preferences

### 2. Configure Notifications

Visit the admin notification settings page:

```
http://localhost:3000/admin/notifications
```

Configure your preferences:

**Email Notifications:**
- ✅ Enable email notifications
- Enter your email address

**WhatsApp Notifications:**
- ✅ Enable WhatsApp notifications
- Enter your phone number with country code (e.g., +230 5989 1414)

### 3. Integrate Email Service (Optional)

By default, email notifications are logged to the console. To send actual emails, integrate an email service:

**Recommended Services:**
- **Resend** (https://resend.com) - Modern email API
- **SendGrid** (https://sendgrid.com) - Popular choice
- **Mailgun** (https://mailgun.com) - Reliable service

**Implementation:**

Edit `src/app/api/notifications/send/route.ts` and update the `sendEmailNotification` function:

```typescript
// Example with Resend
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'orders@plaquexpress.com',
  to: emailAddress,
  subject: subject,
  text: body
});
```

### 4. Integrate WhatsApp Service (Optional)

By default, WhatsApp notifications are logged to the console. To send actual WhatsApp messages, integrate a WhatsApp service:

**Recommended Services:**
- **Twilio WhatsApp API** (https://twilio.com/whatsapp)
- **WhatsApp Business API** (https://business.whatsapp.com)
- **360Dialog** (https://360dialog.com)

**Implementation:**

Edit `src/app/api/notifications/send/route.ts` and update the `sendWhatsAppNotification` function:

```typescript
// Example with Twilio
import twilio from 'twilio';
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

await client.messages.create({
  from: 'whatsapp:+14155238886', // Twilio WhatsApp number
  to: `whatsapp:${whatsappNumber}`,
  body: message
});
```

## Testing

### Test Order Flow

1. Go to http://localhost:3000/builder
2. Create a test plate order
3. Fill in customer details
4. Complete the order
5. Check the checkout confirmation page
6. Verify:
   - Order appears in database
   - Notifications are sent (check console logs or actual email/WhatsApp)

### Verify Database

Check that orders are being saved:

```bash
npx tsx scripts/check-orders.ts
```

Or query directly in Supabase:

```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```

## Configuration

### Environment Variables

Add these to your `.env.local` file (when integrating services):

```env
# Email Service (Resend example)
RESEND_API_KEY=re_...

# WhatsApp Service (Twilio example)
TWILIO_SID=AC...
TWILIO_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://hfndfmtxhqvubnfiwzlz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Notification Templates

Customize the notification messages in `src/app/api/notifications/send/route.ts`:

**Email Template:**
```typescript
const subject = `New Order: ${payload.orderNumber}`;
const body = `
New PlaqueXpress Order Received!

Order Number: ${payload.orderNumber}
...
`;
```

**WhatsApp Template:**
```typescript
const message = `
🔔 *New PlaqueXpress Order*

📋 Order: ${payload.orderNumber}
...
`;
```

## API Documentation

### POST /api/orders

Creates a new order and triggers notifications.

**Request Body:**
```json
{
  "orderNumber": "PX20240001",
  "fullName": "John Doe",
  "phone": "5989 1414",
  "address": "123 Main St, Port Louis",
  "plateNumber": "ABC-1234",
  "vehicleType": "car",
  "plateType": "3d",
  "plateShape": "standard",
  "dimensions": { "width": 52, "height": 11 },
  "totalPrice": 1500,
  "additionalNotes": "Rush order"
}
```

**Response:**
```json
{
  "success": true,
  "order": { ... }
}
```

### GET /api/orders

Retrieves recent orders.

**Response:**
```json
{
  "orders": [
    {
      "id": "...",
      "order_number": "PX20240001",
      "customer_name": "John Doe",
      ...
    }
  ]
}
```

### POST /api/notifications/send

Manually trigger notifications for an order.

**Request Body:**
```json
{
  "orderId": "...",
  "orderNumber": "PX20240001",
  "customerName": "John Doe",
  ...
}
```

**Response:**
```json
{
  "success": true,
  "notifications": [
    { "type": "email", "status": "sent" },
    { "type": "whatsapp", "status": "sent" }
  ]
}
```

### GET /api/notifications/settings

Get current notification settings.

**Response:**
```json
{
  "settings": {
    "email_enabled": true,
    "email_address": "admin@plaquexpress.com",
    "whatsapp_enabled": true,
    "whatsapp_number": "+230 5989 1414"
  }
}
```

### POST /api/notifications/settings

Update notification settings.

**Request Body:**
```json
{
  "email_enabled": true,
  "email_address": "admin@plaquexpress.com",
  "whatsapp_enabled": true,
  "whatsapp_number": "+230 5989 1414"
}
```

## Troubleshooting

### Orders not saving to database

**Symptoms:** Checkout completes but orders don't appear in database

**Solutions:**
1. Verify database tables are created: Run `scripts/init-database.sql` in Supabase SQL Editor
2. Check browser console for API errors
3. Verify Supabase credentials in `src/lib/supabase/client.ts`

### Notifications not being sent

**Symptoms:** Orders save but no notifications received

**Solutions:**
1. Check notification settings at `/admin/notifications`
2. Verify email/WhatsApp is enabled and contact info is correct
3. Check server console logs for notification errors
4. Ensure email/WhatsApp service is properly configured

### RLS Policy Errors

**Symptoms:** "new row violates row-level security policy" errors

**Solutions:**
1. Verify the scoped JWT token is valid and not expired
2. Ensure tenantid and projectid match the JWT claims
3. Check RLS policies are correctly configured in database

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── orders/
│   │   │   └── route.ts          # Order creation API
│   │   └── notifications/
│   │       ├── send/
│   │       │   └── route.ts      # Send notifications
│   │       └── settings/
│   │           └── route.ts      # Manage settings
│   ├── admin/
│   │   └── notifications/
│   │       └── page.tsx          # Settings UI
│   └── checkout/
│       └── page.tsx              # Updated checkout
├── lib/
│   └── supabase/
│       ├── client.ts             # Supabase client
│       └── types.ts              # TypeScript types
└── scripts/
    ├── init-database.sql         # Database setup SQL
    └── init-database.ts          # Database check script
```

## Next Steps

1. ✅ Run database initialization script
2. ✅ Configure notification settings
3. 🔄 Integrate email service (Resend, SendGrid, etc.)
4. 🔄 Integrate WhatsApp service (Twilio, etc.)
5. ✅ Test with a real order
6. 🔄 Monitor notifications in production

## Support

For questions or issues:
- Check server console logs for detailed error messages
- Verify database connection and table structure
- Ensure notification services are properly configured
- Test with sample orders to isolate issues
