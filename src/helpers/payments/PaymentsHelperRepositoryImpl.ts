import {Payment, PaymentQueryParams, PaymentsState} from "@/store/payments/types";
import _store from "@/store";
import { useStore } from "vuex-simple";
import Store from "@/store/store";
import { PaymentsHelperRepository } from "@/helpers/payments/PaymentsHelperRepository";
import PaymentService from "@/api/services/payments/PaymentService";
import {isEmpty} from "@/index";

class PaymentsHelperRepositoryImpl implements PaymentsHelperRepository {
  store: Store = useStore(_store);
  get payments(): PaymentsState["payments"] {
    return this.store.payments.state.payments;
  }
  get isLoading(): boolean {
    return this.store.payments.state.isLoading;
  }

  get total(): PaymentsState['total'] {
    return this.store.payments.state.total
  }

  get selectedPaymentId(): PaymentsState["selectedPaymentId"] {
    return this.store.payments.state.selectedPaymentId;
  }
  set selectedPaymentId(paymentId) {
    this.store.payments.setSelectedPayment(paymentId);
  }

  get selectedPayment(): Payment | undefined {
    if (this.payments && this.selectedPaymentId) {
      return this.store.payments.state.payments!.get(this.selectedPaymentId)
    }
  }

  async fetchPayments(params?: PaymentQueryParams): Promise<void> {
    this.store.payments.toggleLoading(true);
    const payments = await PaymentService.fetchPayments(params);
    const paymentsMap: Map<string, Payment> = new Map();
    if (payments && payments.payments) {
      payments.payments.forEach((item) => {
        paymentsMap.set(item.payment.id, {
          ...item.payment,
          operation_status: item.operation_status,
          cheques: isEmpty(item.cheques) ? item.cheques : null,
          transfer: item.transfer
        });
      });
      this.store.payments.setPayments(paymentsMap);
      this.store.payments.setTotal(payments.total)
    } else {
      this.store.payments.setPayments(null)
      this.store.payments.setTotal(null)
    }
    this.store.payments.toggleLoading(false);
  }

  async fetchConfirmHold(paymentId: Payment["id"]): Promise<void> {
    await PaymentService.fetchConfirmHold(paymentId);
    await this.fetchPayments();
  }

  async fetchCancelHold(paymentId: Payment["id"]): Promise<void> {
    await PaymentService.fetchCancelHold(paymentId);
    await this.fetchPayments();
  }
}

export const paymentsHelper = new PaymentsHelperRepositoryImpl();
