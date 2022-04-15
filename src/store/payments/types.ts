import {ChequeApi, PaymentApi, PaymentsQueryParamsApi, StatusOperationApi} from "@/api/services/payments/models";

export type Payment = PaymentApi & { operation_status: StatusOperationApi, cheques: ChequeApi[] | null, transfer: any };
export type PaymentQueryParams = PaymentsQueryParamsApi
export type PaymentsState = {
  isLoading: boolean;
  payments: Map<string, Payment> | null;
  selectedPaymentId: string | null;
  total: number | null
};
