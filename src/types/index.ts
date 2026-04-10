export interface Business {
  id: string;
  owner_id?: string;
  name: string;
  slug: string;
  category?: string;
  description?: string;
  email?: string;
  phone?: string;
  city?: string;
  district?: string;
  address?: string;
  cover_image?: string;
  logo?: string;
  is_verified?: boolean;
  is_active?: boolean;
  is_featured?: boolean;
  is_premium?: boolean;
  rating?: number;
  review_count?: number;
  price_range?: string;
  working_hours?: Record<string, { start: string; end: string }>;
  created_at?: string;
  updated_at?: string;
  status?: string;
  premium_until?: string;
  featured_until?: string;
  referral_active?: boolean;
  marketing_bio?: string;
  personnel_limit?: number;
  branding_config?: Record<string, any>;
}

export interface Service {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  price: number;
  duration?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface Staff {
  id: string;
  business_id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
  is_active?: boolean;
  created_at?: string;
  user_id?: string;
}

export interface Appointment {
  id: string;
  business_id: string;
  staff_id?: string;
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  appointment_date: string;
  appointment_time: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled" | "no_show" | "waitlist";
  notes?: string;
  total_price?: number;
  service_name?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  business_id: string;
  customer_id?: string;
  appointment_id?: string;
  customer_name: string;
  rating: number;
  comment?: string;
  is_visible?: boolean;
  created_at?: string;
  reply?: string;
  replied_at?: string;
}

export interface Branch {
  id: string;
  business_id: string;
  name: string;
  slug: string;
  is_main?: boolean;
  is_active?: boolean;
  address?: string;
  phone?: string;
  custom_working_hours?: Record<string, any>;
  created_at?: string;
}

export interface Boost {
  id: string;
  business_id: string;
  package_name: string;
  status?: string;
  started_at?: string;
  expires_at: string;
}

export interface Coupon {
  id: string;
  business_id?: string;
  title: string;
  code: string;
  discount_type?: string;
  discount_value: number;
  is_active?: boolean;
  usage_count?: number;
  created_at?: string;
}

export interface CustomerLoyalty {
  id: string;
  business_id?: string;
  customer_id?: string;
  current_stamps?: number;
  total_completed_appointments?: number;
  last_stamp_at?: string;
  updated_at?: string;
}

export interface LoyaltyProgram {
  id: string;
  business_id?: string;
  target_stamps?: number;
  reward_title: string;
  reward_type?: string;
  reward_value?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface Inventory {
  id: string;
  business_id?: string;
  name: string;
  quantity: number;
  unit?: string;
  low_stock_threshold?: number;
  last_updated?: string;
  created_at?: string;
}

export interface PricingRule {
  id: string;
  business_id?: string;
  service_id?: string;
  rule_name: string;
  day_of_week?: string;
  start_time?: string;
  end_time?: string;
  multiplier: number;
  type?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface Referral {
  id: string;
  referrer_id?: string;
  referred_id?: string;
  referral_code: string;
  status?: string;
  created_at?: string;
  completed_at?: string;
}

export interface Subscription {
  id: string;
  business_id: string;
  plan_name: string;
  amount: number;
  status?: string;
  started_at?: string;
  expires_at: string;
}

export interface Waitlist {
  id: string;
  user_id: string;
  business_id: string;
  desired_date: string;
  desired_time?: string;
  created_at: string;
}

export interface TrafficLog {
  id: string;
  created_at?: string;
  path?: string;
  user_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
}

export interface SupportTicket {
  id: string;
  business_id: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
