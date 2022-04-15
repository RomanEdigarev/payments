import { PaymentServiceRepository } from "@/api/services/payments/PaymentServiceRepository";
import { paymentRepo } from "@/api/services/payments/PaymentServiceRepositoryImpl";
import {PaymentApi, PaymentsApi, PaymentsQueryParamsApi} from "@/api/services/payments/models";

class PaymentService {
  private readonly repository: PaymentServiceRepository;

  constructor(repository: PaymentServiceRepository) {
    this.repository = repository;
  }

  async fetchPayments(params?: PaymentsQueryParamsApi): Promise<PaymentsApi> {
    return await this.repository.fetchPayments(params);
  }

  async fetchConfirmHold(paymentId: PaymentApi["id"]): Promise<PaymentApi | null> {
    return await this.repository.fetchConfirmHold(paymentId)
  }

  async fetchCancelHold(paymentId: PaymentApi["id"]): Promise<PaymentApi | null> {
    return await this.repository.fetchCancelHold(paymentId)
  }
}

export default new PaymentService(paymentRepo);
