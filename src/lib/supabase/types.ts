export interface Order {
  id: string;
  tenantid: string;
  projectid: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  plate_number: string;
  vehicle_type: string;
  plate_type: string;
  plate_shape: string;
  dimensions: {
    width: number;
    height: number;
  };
  total_price: number;
  additional_notes: string | null;
  order_data: any;
  status: 'pending' | 'confirmed' | 'production' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface NotificationSettings {
  id: string;
  tenantid: string;
  projectid: string;
  email_enabled: boolean;
  email_address: string | null;
  whatsapp_enabled: boolean;
  whatsapp_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  orderNumber: string;
  fullName: string;
  phone: string;
  address: string;
  plateNumber: string;
  vehicleType: string;
  plateType: string;
  plateShape: string;
  dimensions: {
    width: number;
    height: number;
  };
  totalPrice: number;
  additionalNotes?: string;
  orderData?: any;
}
