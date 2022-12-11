import { APIResponse, FetchCall } from "../models";

export default function login(
  email: string,
  password: string
): FetchCall<APIResponse<{ token: string }>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
