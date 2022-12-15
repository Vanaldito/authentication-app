import { useEffect, useState } from "react";
import { UserInfoContext } from "../../contexts";
import { useFetchAndLoad } from "../../hooks";
import { UserInfo } from "../../models";
import { getUserInfo } from "../../services";

interface UserInfoProviderProps {
  children: React.ReactNode;
}

export default function UserInfoProvider({ children }: UserInfoProviderProps) {
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null);

  const { callEndpoint } = useFetchAndLoad();

  function reloadUserInfo() {
    callEndpoint(getUserInfo()).then(res => {
      if (res.data) setUserInfo(res.data);
      else setUserInfo(null);
    });
  }

  useEffect(() => {
    reloadUserInfo();
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, reloadUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
