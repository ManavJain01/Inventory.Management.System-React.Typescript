import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/homepage";
import LoadingPage from "./components/LoadingPage";
import SignUp from "./pages/signup";
import Login from "./pages/loginpage";
const ProfilePage = React.lazy(() => import("./pages/profilepage"));

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Basic />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingPage />}>
                <ProfilePage />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
