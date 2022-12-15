import { useContext } from "react";
import { UserInfoContext } from "../contexts";

export default function useUserInfo() {
  return useContext(UserInfoContext);
}
