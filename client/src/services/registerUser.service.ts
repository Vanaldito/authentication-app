import { APIResponse, FetchCall } from "../models";

export default function registerUser(
  email: string,
  password: string
): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
