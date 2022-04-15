import {PaymentApi, PaymentsApi, PaymentsQueryParamsApi} from "@/api/services/payments/models";

export interface PaymentServiceRepository {
  fetchPayments(params?: PaymentsQueryParamsApi): Promise<PaymentsApi>;
  fetchConfirmHold(paymentId: PaymentApi["id"]): Promise<PaymentApi | null>;
  fetchCancelHold(paymentId: PaymentApi["id"]): Promise<PaymentApi | null>;
}
