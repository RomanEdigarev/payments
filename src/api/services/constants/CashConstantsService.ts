import { CashConstantsServiceRepository } from "@/api/services/constants/CashConstantsServiceRepository";
import { CashConstantApi, CashConstantsApi } from "@/api/services/constants/models";
import { cashConstantRepo } from "@/api/services/constants/CashConstantsServiceRepositoryImpl";


class CashConstantsService {
  private repository: CashConstantsServiceRepository;

  constructor(repository: CashConstantsServiceRepository) {
    this.repository = repository;
  }

  async fetchData(): Promise<CashConstantsApi> {
    return await this.repository.fetchData();
  }

  async fetchUpdateItem(data: CashConstantApi): Promise<void> {
    await this.repository.fetchUpdateItem(data);
  }
}

export default new CashConstantsService(cashConstantRepo);
