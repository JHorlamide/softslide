import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript />
      <Toaster toastOptions={{
        duration: 4000,
        position: "top-right",
      }}
      />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
