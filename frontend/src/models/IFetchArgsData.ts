export interface IFetchArgsData {
  type: string;
  endpoint: string;
  requestData?: object | string;
  queryParams?: Record<string, string | number | boolean>;
  attachment?: File;
}
