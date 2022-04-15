import { CashConstantsHelperRepository } from "@/helpers/constants/CashConstantsHelperRepository";
import { CashConstant, CashConstantState } from "@/store/constants/types";
import Store from "@/store/store";
import { useStore } from "vuex-simple";
import _store from "@/store";
import CashConstantsService from "@/api/services/constants/CashConstantsService";

class CashConstantsHelperRepositoryImpl implements CashConstantsHelperRepository {
  store: Store = useStore(_store);
  get constants(): CashConstantState["items"] {
    return this.store.constants.state.items;
  }
  set constants(value: CashConstantState["items"]) {
    this.store.constants.setConstants(value);
  }

  get isLoading(): CashConstantState["isLoading"] {
    return this.store.constants.state.isLoading;
  }

  set isLoading(value: CashConstantState["isLoading"]) {
    this.store.constants.toggleLoading(value);
  }

  async fetchConstants(): Promise<void> {
    this.isLoading = true;
    const constants = await CashConstantsService.fetchData();
    const constantsMap = new Map<string, CashConstant>();
    if (constants && constants.list.length > 0) {
      constants.list.forEach((constant) => {
        constantsMap.set(constant.name, constant);
      });
    }
    this.constants = constantsMap;
  }

  async saveConstants(form: { [key: string]: string }): Promise<void> {
    this.isLoading = true;
    for (const key in form) {
      await CashConstantsService.fetchUpdateItem({ name: key, value: form[key] });
    }
    await this.fetchConstants();
  }
}

export const cashConstantsHelperRepo = new CashConstantsHelperRepositoryImpl()
