/* React */
import React from "react";

/* Libraries */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Application Module */
import { HOME_ENTRY } from "./config/AppConfig";
import AppRoute from "./routes/AppRoute";
import Home from "./views/Home/Home";

const App: React.FC = () => {
  const routes = [
    {
      key: "app",
      path: HOME_ENTRY,
      component: Home
    },
  ]

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ key, path, component }) => (
          <Route
            key={key}
            path={path}
            element={
              <AppRoute
                routeKey={key}
                component={component}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
