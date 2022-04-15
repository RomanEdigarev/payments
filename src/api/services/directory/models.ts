export interface DirectoryShopApi {
  id: string;
  shop_code: string;
  fiscal_device_group_id: string;
  created_at: string;
  updated_at: string;
}

export type DirectoryShopsApi = {
  list: DirectoryShopApi[]
} | null

export type DirectoryShopQueryParamsApi = {
  limit?: number,
  offset?: number,
}

export type DirectoryOrangesApi = {
  list: DirectoryOrangeApi[];
} | null;

export type DirectoryOrangeApi = {
  id: string;
  name: string;
  timezone_name: string;
  online_group_name: string;
  offline_group_name: string;
  fiscalization_type: string;
  is_default: boolean;
  bindings: null;
  created_at: string;
  updated_at: string;
};
type DirectoryOrangeCreateParams = "name" | "timezone_name" | "online_group_name" | "offline_group_name" | "is_default"
export type DirectoryOrangeCreateParamsApi = Pick<DirectoryOrangeApi, DirectoryOrangeCreateParams>
