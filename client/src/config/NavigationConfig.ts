/* Libraries */
import { FaProjectDiagram } from "react-icons/fa";
import { GiDna1 } from "react-icons/gi"
import { IconType } from 'react-icons';

/* Application Modules */
import { APP_PREFIX_PATH } from "./AppConfig";

interface NavConfigProps {
  key: string;
  title: string;
  path: string;
  Icon: IconType;
}

const navigationConfig: NavConfigProps[] = [
  {
    key: 'slide',
    path: `${APP_PREFIX_PATH}/slides`,
    title: 'Slid',
    Icon: FaProjectDiagram,
  },
]

export default navigationConfig;