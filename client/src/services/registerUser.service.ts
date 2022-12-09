import { APIResponse, FetchCall } from "../models";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export default function registerUser({
  username,
  email,
  password,
}: UserData): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
