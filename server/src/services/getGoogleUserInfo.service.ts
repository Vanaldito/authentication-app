interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
  locale: string;
}

export default async function getGoogleUserInfo(
  access_token: string
): Promise<GoogleUserInfo> {
  const res = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: { Authorization: "Bearer " + access_token },
    }
  );
  console.log(res);
  return await res.json();
}
