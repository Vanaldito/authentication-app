import { Navbar, ProtectedRoute } from "../../components";

import "./HomePage.css";

export default function HomePage() {
  return (
    <ProtectedRoute>
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
            <button className="user-info__edit-button" type="button">
              Edit
            </button>
          </header>
          <div className="user-info__table">
            <div className="user-info__row">
              <span className="user-info__key">PHOTO</span>
              <span className="user-info__value">
                <img
                  className="user-info__profile-image"
                  src="https://gravatar.com/avatar/"
                />
              </span>
            </div>
            <div className="user-info__row">
              <span className="user-info__key">NAME</span>
              <span className="user-info__value">Vanaldito</span>
            </div>
            <div className="user-info__row">
              <span className="user-info__key">BIO</span>
              <span className="user-info__value">
                I am a software developer and a big fan of devchallenges
              </span>
            </div>
            <div className="user-info__row">
              <span className="user-info__key">PHONE</span>
              <span className="user-info__value">12345678</span>
            </div>
            <div className="user-info__row">
              <span className="user-info__key">EMAIL</span>
              <span className="user-info__value">something@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
