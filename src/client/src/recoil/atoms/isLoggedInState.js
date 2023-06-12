import { atom } from "recoil";

const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});

export default isLoggedInState;
