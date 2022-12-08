interface UserData {
  username: string;
  email: string;
  password: string;
}

export default function registerUser({ username, email, password }: UserData) {
  const controller = new AbortController();

  return fetch("/api/v1/register-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    signal: controller.signal,
  });
}
