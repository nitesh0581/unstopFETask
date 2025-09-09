import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  // useEffect(() => {
  //   const onStorage = () => {
  //     setIsAuthenticated(!!localStorage.getItem("authToken"));
  //   };
  //   window.addEventListener("storage", onStorage);
  //   // Listen also for changes within the same tab
  //   const syncAuth = () =>
  //     setIsAuthenticated(!!localStorage.getItem("authToken"));
  //   window.addEventListener("authChange", syncAuth);

  //   return () => {
  //     window.removeEventListener("storage", onStorage);
  //     window.removeEventListener("authChange", syncAuth);
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <HomePage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
