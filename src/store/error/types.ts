import { CashConstantApi } from "@/api/services/constants/models";
import { AxiosError } from "axios";

export type ErrorState = {
  error: AxiosError['response'] | null
}
