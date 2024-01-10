import { APP_PREFIX_PATH } from "./AppConfig";
import Slide from "../views/Slide";

interface IRoute {
  [x: string]: any;
  key: string;
  path: string;
  component: () => JSX.Element
}

export const publicRoute: IRoute[] = [
  {
    key: "slide-project",
    path: `${APP_PREFIX_PATH}/Slid`,
    component: Slide
  },
]

export const protectedRoute: IRoute[] = [

]