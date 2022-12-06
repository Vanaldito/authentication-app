import { MailIcon, PasswordIcon } from "../Icons";

import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="sign-up">
      <h2 className="sign-up__title">
        Join thousands of learners from around the world
      </h2>
      <p className="sign-up__description">
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <form className="sign-up__form">
        <div className="sign-up__fields">
          <label className="sign-up__field-label">
            <span className="sign-up__field-icon">
              <MailIcon />
            </span>
            <input
              className="sign-up__field"
              type="email"
              placeholder="Email"
            />
          </label>
          <label className="sign-up__field-label">
            <span className="sign-up__field-icon">
              <PasswordIcon />
            </span>
            <input
              className="sign-up__field"
              type="password"
              placeholder="Password"
            />
          </label>
        </div>
        <button className="sign-up__submit-button" type="submit">
          Start coding now
        </button>
      </form>
      <div className="sign-up__use-social-profile">
        <p className="sign-up__use-social-profile__description">
          or continue with a social profile
        </p>
        <ul className="sign-up__social-profiles">
          <li>
            <img src="/Google.svg" alt="google logo" width={43} height={43} />
          </li>
          <li>
            <img
              src="/Facebook.svg"
              alt="facebook logo"
              width={43}
              height={43}
            />
          </li>
          <li>
            <img src="/Twitter.svg" alt="twitter logo" width={43} height={43} />
          </li>
          <li>
            <img src="/Github.svg" alt="github logo" width={43} height={43} />
          </li>
        </ul>
      </div>
      <div className="sign-up__already-a-member">
        Already a member?{" "}
        <a className="sign-up__login-link" href="/">
          Login
        </a>
      </div>
    </div>
  );
}
