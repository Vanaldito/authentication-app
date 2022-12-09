export interface FetchCall<T> {
  controller: AbortController;
  call: Promise<T>;
}
