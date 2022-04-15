import { CashConstantsHelperRepository } from "@/helpers/constants/CashConstantsHelperRepository";
import { CashConstantState } from "@/store/constants/types";
import { cashConstantsHelperRepo } from "@/helpers/constants/CashConstatnsHelperRepositoryImpl";

class CashConstantsHelper {
  private repository: CashConstantsHelperRepository;

  constructor(repository: CashConstantsHelperRepository) {
    this.repository = repository;
  }

  get constants(): CashConstantState["items"] {
    return this.repository.constants;
  }

  get isLoading(): CashConstantState["isLoading"] {
    return this.repository.isLoading;
  }

  async fetchConstants(): Promise<void> {
    await this.repository.fetchConstants();
  }
  async saveConstants(form: { [key: string]: string }): Promise<void> {
    await this.repository.saveConstants(form);
  }
}

export default new CashConstantsHelper(cashConstantsHelperRepo);
