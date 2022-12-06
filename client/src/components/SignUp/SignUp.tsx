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
          <input className="sign-up__field" type="email" placeholder="Email" />
          <input
            className="sign-up__field"
            type="password"
            placeholder="Password"
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
          <li>Google</li>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Github</li>
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
