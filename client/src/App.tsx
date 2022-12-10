import { Route, Routes } from "react-router-dom";
import { HomePage, SignUpPage } from "./pages";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
