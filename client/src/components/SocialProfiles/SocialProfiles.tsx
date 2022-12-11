import "./SocialProfiles.css";

export default function SocialProfiles() {
  return (
    <ul className="social-profiles">
      <li>
        <img src="/Google.svg" alt="google logo" width={43} height={43} />
      </li>
      <li>
        <img src="/Facebook.svg" alt="facebook logo" width={43} height={43} />
      </li>
      <li>
        <img src="/Twitter.svg" alt="twitter logo" width={43} height={43} />
      </li>
      <li>
        <img src="/Github.svg" alt="github logo" width={43} height={43} />
      </li>
    </ul>
  );
}
