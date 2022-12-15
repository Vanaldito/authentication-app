import { Route, Routes } from "react-router-dom";
import { AuthProvider, UserInfoProvider } from "./components";
import { EditInfoPage, HomePage, LoginPage, SignUpPage } from "./pages";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <UserInfoProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditInfoPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserInfoProvider>
    </AuthProvider>
  );
}

export default App;
