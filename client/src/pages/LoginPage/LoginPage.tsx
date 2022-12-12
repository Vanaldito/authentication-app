import { Login, Navbar } from "../../components";

import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <Navbar />
      <Login />
    </div>
  );
}