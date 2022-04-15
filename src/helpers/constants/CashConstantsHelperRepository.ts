import { CashConstantState } from "@/store/constants/types";

export interface CashConstantsHelperRepository {
  readonly constants: CashConstantState["items"];
  readonly isLoading: CashConstantState["isLoading"];

  fetchConstants(): Promise<void>;
  saveConstants(form: { [key: string]: string }): Promise<void>;
}
