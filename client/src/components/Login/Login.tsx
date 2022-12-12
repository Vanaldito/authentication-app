import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useFetchAndLoad } from "../../hooks";
import { login } from "../../services";
import { FormField } from "../FormField";
import { MailIcon, PasswordIcon } from "../Icons";
import { Loader } from "../Loader";
import { Modal } from "../Modal";
import { SocialProfiles } from "../SocialProfiles";

import "./Login.css";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const { loading, callEndpoint } = useFetchAndLoad();

  const { setIsLogged } = useAuth();

  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (event.target.value.trim() === "") {
      event.target.setCustomValidity("Please fill out this field");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(event.target.value.trim())
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

    if (loading) return;

    if (password.trim() === "" || email.trim() === "") return;
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) return;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.trim())) return;

    callEndpoint(login(email.trim(), password.trim()))
      .then(res => {
        if (res.error) {
          setError(res.error);
        } else {
          setIsLogged(true);
        }
      })
      .catch(err => console.error(err));

    setPassword("");
    setEmail("");
  }

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form" onSubmit={submitHandler}>
        <div className="login__fields">
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
        <button className="login__submit-button" type="submit">
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
      <div className="login__use-social-profile">
        <p className="login__use-social-profile__description">
          or continue with these social profile
        </p>
        <SocialProfiles />
      </div>
      <div className="login__not-account">
        Don&apos;t have an account yet?{" "}
        <Link className="login__sign-up-link" to="/sign-up">
          Register
        </Link>
      </div>
      {error && <Modal closeModal={() => setError("")}>{error}</Modal>}
    </div>
  );
}
