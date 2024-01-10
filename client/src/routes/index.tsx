/* Libraries */
import { Routes, Route, Navigate } from "react-router-dom";

/* Application Modules */
import { publicRoute } from "../config/RouteConfig";
import AppRoute from "./AppRoute";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        {publicRoute.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
