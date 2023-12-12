import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
