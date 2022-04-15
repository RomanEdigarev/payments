import { CashConstantApi } from "@/api/services/constants/models";

export type CashConstant = CashConstantApi;
export type CashConstants = Map<string, CashConstant> | null;
export type CashConstantState = {
    isLoading: boolean,
    items: CashConstants
}
