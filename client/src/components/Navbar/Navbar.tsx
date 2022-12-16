import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks";
import { Loader } from "../Loader";

import "./Navbar.css";

interface NavbarProps {
  displayUserInfo: boolean;
}

export default function Navbar({ displayUserInfo }: NavbarProps) {
  const { userInfo, loading } = useUserInfo();

  return (
    <nav className="navbar">
      <Link to="/" aria-label="Page logo">
        <img width={131} height={19} src="/devchallenges.svg" alt="Page logo" />
      </Link>
      {displayUserInfo && loading ? <Loader /> : null}
      {displayUserInfo && !loading && userInfo ? (
        <div className="navbar__user-info">
          <img className="navbar__profile-image" src={userInfo.photourl} />
          <div>{userInfo?.name}</div>
        </div>
      ) : null}
    </nav>
  );
}
