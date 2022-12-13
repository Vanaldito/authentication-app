import env from "../../environment";

interface GithubResponse {
  access_token?: string;
}

export default async function getGithubAccessToken(
  code: string
): Promise<GithubResponse> {
  const res = await fetch(
    `https://github.com/login/oauth/access_token?code=${code}&client_id=${env.GITHUB_CLIENT_ID}&client_secret=${env.GITHUB_CLIENT_SECRET}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
  return await res.json();
}
