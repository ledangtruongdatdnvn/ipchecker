import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import RouterPath from "./RouterPath";
import { RouteConfig } from "./types";

export const routesConfig: RouteConfig[] = [
  {
    path: RouterPath.HOME,
    component: HomePage,
    isProtected: true,
  },
  {
    path: RouterPath.REGISTER,
    component: SignUp,
    isProtected: false,
  },
];
