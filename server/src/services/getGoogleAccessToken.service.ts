import env from "../../environment";

interface GoogleResponse {
  access_token?: string;
}

export default async function getGoogleAccessToken(
  code: string
): Promise<GoogleResponse> {
  const res = await fetch(
    `https://oauth2.googleapis.com/token?client_id=${env.GOOGLE_CLIENT_ID}&client_secret=${env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${env.GOOGLE_REDIRECT_URI}`,
    { method: "POST" }
  );
  return await res.json();
}
