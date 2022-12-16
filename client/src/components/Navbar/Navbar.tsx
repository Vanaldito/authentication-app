import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks";
import { ArrowIcon } from "../Icons";
import { Loader } from "../Loader";

import "./Navbar.css";

interface NavbarProps {
  displayUserInfo: boolean;
}

export default function Navbar({ displayUserInfo }: NavbarProps) {
  const [displayDropdownMenu, setDisplayDropdownMenu] = useState(false);

  const { userInfo, loading } = useUserInfo();

  const dropdownMenu = useRef<HTMLDivElement>(null);

  function openMenu() {
    setDisplayDropdownMenu(true);

    window.addEventListener("click", closeMenu, true);

    function closeMenu(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        dropdownMenu.current?.contains(event.target)
      ) {
        return;
      }

      event.stopPropagation();

      setDisplayDropdownMenu(false);

      window.removeEventListener("click", closeMenu, true);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" aria-label="Page logo">
        <img width={131} height={19} src="/devchallenges.svg" alt="Page logo" />
      </Link>
      {displayUserInfo && loading ? <Loader /> : null}
      {displayUserInfo && !loading && userInfo ? (
        <div className="navbar__dropdown-menu-container">
          <div className="navbar__user-info" onClick={openMenu}>
            <img
              className="navbar__profile-image"
              src={userInfo.photourl}
              referrerPolicy="no-referrer"
              alt="Profile Image"
            />
            <div>{userInfo.name}</div>
            <ArrowIcon />
          </div>
          <div
            ref={dropdownMenu}
            className={`navbar__dropdown-menu ${
              displayDropdownMenu ? "navbar__dropdown-menu--displayed" : ""
            }`.trim()}
          >
            <button className="navbar__logout-button">Logout</button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
