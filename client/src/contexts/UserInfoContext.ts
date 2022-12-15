import { createContext } from "react";
import { UserInfo } from "../models";

interface UserInfoContextValue {
  userInfo: UserInfo | null;
  reloadUserInfo: () => void;
  loading: boolean;
  error: null | string;
  clearError: () => void;
}

const UserInfoContext = createContext<UserInfoContextValue>({
  userInfo: null,
  reloadUserInfo: () => undefined,
  loading: false,
  error: null,
  clearError: () => undefined,
});

export default UserInfoContext;
