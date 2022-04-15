import {Payment, PaymentQueryParams, PaymentsState} from "@/store/payments/types";

export interface PaymentsHelperRepository {
    readonly payments: PaymentsState['payments']
    readonly isLoading: PaymentsState['isLoading']
    readonly total: PaymentsState['total']
    selectedPaymentId: PaymentsState['selectedPaymentId']
    selectedPayment: Payment | undefined
    fetchPayments(params?:PaymentQueryParams): Promise<void>
    fetchConfirmHold(paymentId: Payment["id"]): Promise<void>;
    fetchCancelHold(paymentId: Payment["id"]): Promise<void>
}
