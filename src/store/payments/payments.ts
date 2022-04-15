import { Mutation, State } from "vuex-simple";
import { PaymentsState } from "@/store/payments/types";

export default class ModulePaymentsStore {
  @State()
  state: PaymentsState = {
    isLoading: false,
    payments: null,
    selectedPaymentId: null,
    total: null
  };

  @Mutation()
  toggleLoading(payload: PaymentsState["isLoading"]): void {
    this.state.isLoading = payload;
  }

  @Mutation()
  setPayments(payments: PaymentsState["payments"]): void {
    this.state.payments = payments;
  }

  @Mutation()
  setSelectedPayment(paymentId: PaymentsState['selectedPaymentId']): void {
    this.state.selectedPaymentId = paymentId
  }

  @Mutation()
  setTotal(total: PaymentsState['total']): void {
    this.state.total = total
  }
}
