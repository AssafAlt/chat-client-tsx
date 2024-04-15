import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Loader, LoadingOverlay } from "@mantine/core";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import Header from "./components/ui/header/Header";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Suspense
          fallback={
            <LoadingOverlay
              visible={true}
              loaderProps={{ children: <Loader color="blue" /> }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
