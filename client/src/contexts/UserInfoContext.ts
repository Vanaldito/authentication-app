import { createContext } from "react";
import { UserInfo } from "../models";

interface UserInfoContextValue {
  userInfo: UserInfo | null;
  reloadUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextValue>({
  userInfo: null,
  reloadUserInfo: () => undefined,
});

export default UserInfoContext;
