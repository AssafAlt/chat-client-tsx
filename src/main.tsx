import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
