import "./SocialProfiles.css";

export default function SocialProfiles() {
  return (
    <ul className="social-profiles">
      <li>
        <a
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${
            import.meta.env.VITE_GOOGLE_CLIENT_ID
          }&redirect_uri=${window.location.protocol}//${
            window.location.host
          }/oauth/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&access_type=offline`}
        >
          <img src="/Google.svg" alt="google logo" width={43} height={43} />
        </a>
      </li>
      <li>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${
            import.meta.env.VITE_GITHUB_CLIENT_ID
          }`}
        >
          <img src="/Github.svg" alt="github logo" width={43} height={43} />
        </a>
      </li>
    </ul>
  );
}
