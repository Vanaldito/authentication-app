import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" aria-label="Page logo">
        <img width={131} height={19} src="/devchallenges.svg" alt="Page logo" />
      </Link>
    </nav>
  );
}
