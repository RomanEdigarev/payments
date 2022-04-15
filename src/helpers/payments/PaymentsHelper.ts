import { PaymentsHelperRepository } from "@/helpers/payments/PaymentsHelperRepository";
import { paymentsHelper } from "@/helpers/payments/PaymentsHelperRepositoryImpl";
import {Payment, PaymentQueryParams, PaymentsState} from "@/store/payments/types";
import {StatusOperationApi} from "@/api/services/payments/models";

class PaymentsHelper {
  private readonly repository;

  constructor(repository: PaymentsHelperRepository) {
    this.repository = repository;
  }

  get payments(): PaymentsState["payments"] {
    return this.repository.payments;
  }

  get isLoading(): PaymentsState["isLoading"] {
    return this.repository.isLoading;
  }

  get total(): PaymentsState['total'] {
    return this.repository.total
  }

  get selectedPaymentId(): PaymentsState["selectedPaymentId"] {
    return this.repository.selectedPaymentId;
  }
  set selectedPaymentId(paymentId) {
    this.repository.selectedPaymentId = paymentId;
  }

  get selectedPayment(): Payment | undefined {
    return this.repository.selectedPayment
  }

  getOperationStatusType(status: StatusOperationApi ) {
    const map: { [key in StatusOperationApi]: { color: string; text: string } } = {
      cancelled: { color: "yellow", text: "Отмена" },
      success: { color: "green", text: "Списано" },
      new: { color: "blue", text: "Новый" },
      pending: { color: "yellow", text: "Ожидает открытия смены" },
      error: { color: "red", text: "Ошибка" },
      on_hold: { color: "blue", text: "Захолдировано" },
      unknown: { color: "blue", text: "Неизвестно" },
      partial_confirm: { color: "blue", text: "Частично захолдировано" },
      confirmed: { color: "blue", text: "Оплачено" },
      partial_refund: { color: "blue", text: "Частичный возврат" },
      refund: { color: "blue", text: "Полный возврат" },
      sent: { color: "blue", text: "Отправлена" },
      created: { color: "blue", text: "Создается" },
    };
    if (status in map) {
      return map[status];
    } else return { color: "", text: "" };
  }

  async fetchPayments(params?: PaymentQueryParams): Promise<void> {
    await this.repository.fetchPayments(params);
  }

  async fetchConfirmHold(paymentId?: Payment["id"]): Promise<void> {
    if (!paymentId && this.selectedPaymentId) {
      await this.repository.fetchConfirmHold(this.selectedPaymentId);
    } else {
      await this.repository.fetchConfirmHold(paymentId!);
    }
  }

  async fetchCancelHold(paymentId?: Payment["id"]): Promise<void> {
    if (!paymentId && this.selectedPaymentId) {
      await this.repository.fetchCancelHold(this.selectedPaymentId);
    } else {
      await this.repository.fetchCancelHold(paymentId!);
    }
  }
}

export default new PaymentsHelper(paymentsHelper);
