import { PaymentServiceRepository } from "@/api/services/payments/PaymentServiceRepository";
import { client } from "@/api/services/client";
import { PaymentApi, PaymentsApi, PaymentsQueryParamsApi } from "@/api/services/payments/models";
import { ApiError } from "@/apiError/ApiError";

class PaymentServiceRepositoryImpl implements PaymentServiceRepository {
  async fetchPayments(params?: PaymentsQueryParamsApi): Promise<PaymentsApi> {
    try {
      let response = null;
      if (params) {
        response = await client.get(`payments`, { params });
      } else {
        response = await client.get(`payments`, { params: { limit: 50 } });
      }
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchConfirmHold(paymentId: PaymentApi["id"]): Promise<PaymentApi | null> {
    try {
      const response = await client.post(`payments/${paymentId}/confirm`);
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }

  async fetchCancelHold(paymentId: PaymentApi["id"]): Promise<PaymentApi | null> {
    try {
      const response = await client.delete(`payments/${paymentId}`);
      return response.data;
    } catch (e) {
      new ApiError(e);
      return null;
    }
  }
}

export const paymentRepo = new PaymentServiceRepositoryImpl();
