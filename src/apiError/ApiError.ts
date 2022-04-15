import { AxiosError } from "axios";
import _store from "@/store";
import Store from "@/store/store";
import { useStore } from "vuex-simple";

export class ApiError {
  private static store: Store = useStore(_store);

  constructor(error: AxiosError) {
    ApiError.store.error.setError(error.response);
  }

  static get apiError(): AxiosError['response'] | null {
    return ApiError.store.error.state.error;
  }
}
