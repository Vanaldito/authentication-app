import { APIResponse, FetchCall, UserInfo } from "../models";

export default function getUserInfo(): FetchCall<APIResponse<UserInfo>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/user-info", { signal: controller.signal }).then(res =>
      res.json()
    ),
    controller,
  };
}
