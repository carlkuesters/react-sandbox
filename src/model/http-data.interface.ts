export interface HttpData<T> {
  loading: boolean;
  data: T | null;
  error: any;
}
