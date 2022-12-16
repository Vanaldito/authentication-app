import { Navbar } from "../../components";
import { SignUp } from "./components";

import "./SignUpPage.css";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <Navbar displayUserInfo={false} />
      <SignUp />
    </div>
  );
}
