import { createContext } from "react";

interface AuthContextValue {
  isLogged: boolean | undefined;
  setIsLogged: (isLogged: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLogged: undefined,
  setIsLogged: () => undefined,
});

export default AuthContext;
