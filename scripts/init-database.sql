-- ============================================
-- PlaqueXpress Database Initialization
-- Run this script once to set up the database tables
-- ============================================

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenantid TEXT NOT NULL,
  projectid UUID NOT NULL,

  -- Order identification
  order_number TEXT NOT NULL UNIQUE,

  -- Customer information
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,

  -- Order details
  plate_number TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  plate_type TEXT NOT NULL,
  plate_shape TEXT NOT NULL,
  dimensions JSONB NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,

  -- Additional info
  additional_notes TEXT,
  order_data JSONB,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'production', 'ready', 'delivered', 'cancelled')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraints
ALTER TABLE public.orders
  ADD CONSTRAINT fk_tenant FOREIGN KEY (tenantid) REFERENCES public.tenants(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_project FOREIGN KEY (projectid) REFERENCES public.projects(id) ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS policies for orders
CREATE POLICY "anon_select_orders" ON public.orders FOR SELECT TO anon
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_select_orders" ON public.orders FOR SELECT TO authenticated
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_insert_orders" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_update_orders" ON public.orders FOR UPDATE TO authenticated
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_delete_orders" ON public.orders FOR DELETE TO authenticated
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

-- Indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_tenant_project ON public.orders(tenantid, projectid);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Comments for orders
COMMENT ON TABLE public.orders IS 'Customer plate orders with tenant/project isolation';
COMMENT ON COLUMN public.orders.tenantid IS 'FK to tenants.id';
COMMENT ON COLUMN public.orders.projectid IS 'FK to projects.id';
COMMENT ON COLUMN public.orders.order_number IS 'Unique order identifier (e.g., PX20240001)';
COMMENT ON COLUMN public.orders.status IS 'Order status: pending, confirmed, production, ready, delivered, cancelled';

-- ============================================
-- Notification Settings Table
-- ============================================

-- Create notification_settings table
CREATE TABLE IF NOT EXISTS public.notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenantid TEXT NOT NULL,
  projectid UUID NOT NULL,

  -- Email settings
  email_enabled BOOLEAN DEFAULT FALSE,
  email_address TEXT,

  -- WhatsApp settings
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  whatsapp_number TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraints
ALTER TABLE public.notification_settings
  ADD CONSTRAINT fk_tenant FOREIGN KEY (tenantid) REFERENCES public.tenants(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_project FOREIGN KEY (projectid) REFERENCES public.projects(id) ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for notification_settings
CREATE POLICY "anon_select_notif_settings" ON public.notification_settings FOR SELECT TO anon
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_select_notif_settings" ON public.notification_settings FOR SELECT TO authenticated
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_insert_notif_settings" ON public.notification_settings FOR INSERT TO authenticated
  WITH CHECK (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_update_notif_settings" ON public.notification_settings FOR UPDATE TO authenticated
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

CREATE POLICY "auth_delete_notif_settings" ON public.notification_settings FOR DELETE TO authenticated
  USING (tenantid = (auth.jwt() ->> 'tenant_id')::text AND projectid = (auth.jwt() ->> 'project_id')::uuid);

-- Indexes for notification_settings
CREATE INDEX IF NOT EXISTS idx_notif_settings_tenant_project ON public.notification_settings(tenantid, projectid);

-- Comments for notification_settings
COMMENT ON TABLE public.notification_settings IS 'Email and WhatsApp notification settings for order alerts';
COMMENT ON COLUMN public.notification_settings.tenantid IS 'FK to tenants.id';
COMMENT ON COLUMN public.notification_settings.projectid IS 'FK to projects.id';
COMMENT ON COLUMN public.notification_settings.email_enabled IS 'Enable email notifications for new orders';
COMMENT ON COLUMN public.notification_settings.whatsapp_enabled IS 'Enable WhatsApp notifications for new orders';
