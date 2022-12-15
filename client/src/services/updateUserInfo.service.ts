import { APIResponse, FetchCall } from "../models";

interface EditableValues {
  photoUrl?: string;
  name?: string;
  bio?: string;
  phone?: string;
}

export default function updateUserInfo(
  values: EditableValues
): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
