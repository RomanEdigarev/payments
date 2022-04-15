import {ChequeApi, PaymentApi} from "@/api/services/payments/models";

export type ShiftsApi = {
  list: ShiftApi[];
} | null;

export type ShiftApi = ClosingsShiftApi | OpeningsShiftApi

type BaseShiftApi = {
  data_id: string;
  id: number;
  companyINN: string;
  groupId: string;
  group: string;
  createdAt: string;
  deviceSN: string;
  deviceRN: string;
  fsNumber: string;
  deviceName: string;
  deviceModel: string;
  shiftNumber: number;
  shiftOpenedAt: string;
  fsDocumentNumber: number;
  fp: string;
};

export type OpeningsShiftApi = BaseShiftApi & {
  data_updated_at: string;
  data_created_at: string;
  status: string
};
export type ClosingsShiftApi = BaseShiftApi & {
  fsExpirationDate: string;
  fsLastRegistrationDate: string;
  ofdAddress: string;
  ofdPort: number;
  settlementAddress: string;
  settlementPlace: string;
  companyName: string;
  fsDocumentsCount: number;
  incomeStats: { [key: string]: number };
  outcomeStats: { [key: string]: number };
  incomeRefundStats: { [key: string]: number };
  outcomeRefundStats: { [key: string]: number };
  unnulableTotalizerIncomeStats: UnnulableTotalizerStats;
  unnulableTotalizerOutcomeStats: UnnulableTotalizerStats;
  unnulableTotalizerIncomeRefundStats: UnnulableTotalizerStats;
  unnulableTotalizerOutcomeRefundStats: UnnulableTotalizerStats;
  status: string
};

export interface UnnulableTotalizerStats {
  cashSum: number;
  electronicSum: number;
  postPaymentSum: number;
  prePaymentSum: number;
  barterSum: number;
}

export type ShiftsQueryParamsApi = {
  offset?: number,
  status?: string;
};
