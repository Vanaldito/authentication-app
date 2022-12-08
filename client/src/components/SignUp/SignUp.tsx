import { useState } from "react";
import { FormField } from "../FormField";
import { MailIcon, PasswordIcon } from "../Icons";

import "./SignUp.css";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (event.target.value.trim() === "") {
      event.target.setCustomValidity("Please fill out this field");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(event.target.value)
    ) {
      event.target.setCustomValidity(
        "Password must contain at least 8 characters, including UPPER/lowercase and numbers"
      );
    } else {
      event.target.setCustomValidity("");
    }
  }

  function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="sign-up">
      <h2 className="sign-up__title">
        Join thousands of learners from around the world
      </h2>
      <p className="sign-up__description">
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <form className="sign-up__form" onSubmit={submitHandler}>
        <div className="sign-up__fields">
          <FormField
            icon={<MailIcon />}
            required={true}
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeEmail}
          />
          <FormField
            icon={<PasswordIcon />}
            required={true}
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          />
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
