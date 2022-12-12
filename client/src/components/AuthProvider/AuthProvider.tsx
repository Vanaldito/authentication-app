import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { useFetchAndLoad } from "../../hooks";
import { isLogged as isLoggedService } from "../../services";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState<undefined | boolean>(undefined);
  const { callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    callEndpoint(isLoggedService())
      .then(res => {
        if (res.data) {
          setIsLogged(res.data.isLogged);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}
