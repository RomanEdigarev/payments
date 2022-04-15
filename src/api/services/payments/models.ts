export type PaymentApi = {
  amount: number;
  available_amount: number;
  available_for_refund: DeliveryApi[];
  cart_items: DeliveryApi[];
  client_email: string;
  client_id: number;
  client_name: string;
  client_phone: string;
  created_at: string;
  delivery: DeliveryApi;
  id: string;
  im_version: string;
  order_created_at: string;
  order_id: number;
  order_number: string;
  payment_method: PaymentMethodApi;
  shop_id: string;
  shopcode: string;
  state: StatusOperationApi;
  updated_at: string;
};

enum StatusOperation {
  "new" = "new",
  "pending" = "pending",
  "error" = "error",
  "success" = "success",
  "cancelled" = "cancelled",
  "on_hold" = "on_hold",
  "confirmed" = "confirmed",
  'unknown'='unknown',
  'created'='created',
  'partial_confirm'="partial_confirm",
  'partial_refund'='partial_refund',
  'refund'='refund',
  'sent'='sent'
}

export type StatusOperationApi = keyof typeof StatusOperation;

export type DeliveryApi = {
  amount: number;
  cis: string;
  discount: DiscountApi[];
  discount_type: string;
  discount_value: number;
  good_article: string;
  id: string;
  measure: string;
  name: string;
  payment_type: string;
  price: number;
  price_discount: number;
  quantity: number;
  tax_amount: number;
  tax_type: string;
  type: string;
};

export type DiscountApi = {
  discount_amount: number;
  discount_type: string;
};

export type PaymentMethodApi = {
  card: CardApi;
  client_id: number;
  created_at: string;
  id: string;
  method: string;
  payload: PayloadApi;
  updated_at: string;
};

export type CardApi = {
  created_at: string;
  expired_at: string;
  id: string;
  is_default: boolean;
  masked_pan: string;
  payment_system: string;
  payment_way: string;
};

export type PayloadApi = {
  binding_id: string;
  token: string;
  url: string;
};

export interface ChequeApi {
  id: string;
  fiscal_device_group_id: string;
  fiscal_device_group_name: string;
  cheque_type: string;
  document_id: string;
  payment_id: string;
  payment_state_id: string;
  order_number: string;
  cart_items: CartItemApi[];
  state: StatusOperationApi;
  data: ChequeDataApi;
  errors: null;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface CartItemApi {
  id: string;
  name: string;
  good_article?: string;
  quantity: number;
  measure: string;
  price: number;
  price_discount?: number;
  amount: number;
  tax_type: string;
  tax_amount: number;
  type: string;
  payment_type: string;
  discount: DiscountApi[];
}

export interface ChequeDataApi {
  id: string;
  deviceSN: string;
  deviceRN: string;
  fsNumber: string;
  ofdName: string;
  ofdWebsite: string;
  ofdINN: string;
  fnsWebsite: string;
  companyINN: string;
  companyName: string;
  documentNumber: number;
  shiftNumber: number;
  documentIndex: number;
  processedAt: string;
  fp: string;
  content: string;
}

type PaymentDataApi = {
  cheques: ChequeApi[];
  operation_status: StatusOperationApi;
  payment: PaymentApi;
  transfer: any
};

export type PaymentsQueryParamsApi = {
  limit?: string | number;
  offset?: string | number;
  paymentState?: PaymentApi['state'];
  from?: string;
  to?: string;
  transferStatus?: PaymentDataApi['operation_status'];
  fiscalizationStatus?: ChequeApi['state'];
};

export type PaymentsApi = { payments: PaymentDataApi[], total: number } | null;
