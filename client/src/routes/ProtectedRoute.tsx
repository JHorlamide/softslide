import { useLocation, Navigate, Outlet } from "react-router-dom";
import {
  AUTH_PREFIX_PATH,
  HOME_ENTRY,
  REDIRECT_URL_KEY,
} from "../config/AppConfig";

const ProtectedRoute = () => {
  const location = useLocation();

  if (!true) {
    return (
      <Navigate
        to={`${AUTH_PREFIX_PATH}${HOME_ENTRY}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
