import "./SocialProfiles.css";

export default function SocialProfiles() {
  return (
    <ul className="social-profiles">
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
