import { Link } from "react-router-dom";
import { Loader, Navbar, ProtectedRoute } from "../../components";
import { useUserInfo } from "../../hooks";

import "./HomePage.css";

export default function HomePage() {
  const { userInfo } = useUserInfo();

  return (
    <ProtectedRoute>
      {!userInfo ? (
        <Loader />
      ) : (
        <div className="home-page">
          <Navbar />
          <header className="home-page__header">
            <h1 className="home-page__title">Personal Info</h1>
            <p className="home-page__description">
              Basic info, like your name and photo
            </p>
          </header>
          <div className="user-info">
            <header className="user-info__header">
              <div>
                <h2 className="user-info__title">Profile</h2>
                <p className="user-info__warning">
                  Some info may be visible to other people
                </p>
              </div>
              <Link to="/edit" className="user-info__edit-link">
                Edit
              </Link>
            </header>
            <div className="user-info__table">
              <div className="user-info__row">
                <span className="user-info__key">PHOTO</span>
                <span className="user-info__value">
                  <img
                    className="user-info__profile-image"
                    src={userInfo?.photourl}
                    alt="Profile Image"
                  />
                </span>
              </div>
              <div className="user-info__row">
                <span className="user-info__key">NAME</span>
                <span className="user-info__value">{userInfo?.name}</span>
              </div>
              <div className="user-info__row">
                <span className="user-info__key">BIO</span>
                <span className="user-info__value">{userInfo?.bio}</span>
              </div>
              <div className="user-info__row">
                <span className="user-info__key">PHONE</span>
                <span className="user-info__value">{userInfo?.phone}</span>
              </div>
              <div className="user-info__row">
                <span className="user-info__key">EMAIL</span>
                <span className="user-info__value">{userInfo?.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
