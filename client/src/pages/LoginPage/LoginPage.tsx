import { Login } from "./components";
import { Navbar } from "../../components";

import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <Navbar displayUserInfo={false} />
      <Login />
    </div>
  );
}
