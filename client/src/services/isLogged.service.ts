import { APIResponse, FetchCall } from "../models";

export default function isLogged(): FetchCall<
  APIResponse<{ isLogged: boolean }>
> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/is-logged", { signal: controller.signal }).then(res =>
      res.json()
    ),
    controller,
  };
}
