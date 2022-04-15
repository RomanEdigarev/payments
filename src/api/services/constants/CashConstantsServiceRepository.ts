import {CashConstantApi, CashConstantsApi} from "@/api/services/constants/models";

export interface CashConstantsServiceRepository {
    fetchData(): Promise<CashConstantsApi>
    fetchUpdateItem(data: CashConstantApi): Promise<void>
}
