import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Importing Layouts
import Basic from "./layouts/Basic";

// Importing Components
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import RoleAuthRoute from "./components/Auth/RoleAuthRoute";
import { useAppSelector } from "./store/store";

// Importing Pages
import Home from "./pages/homepage";
import LoadingPage from "./components/LoadingPage";
import SignUp from "./pages/signup";
import Login from "./pages/loginpage";
import NotFoundPage from "./pages/notfoundpage";
const ProfilePage = React.lazy(() => import("./pages/profilepage"));
const WarehousePage = React.lazy(() => import("./pages/warehousepage"));
const ProductPage = React.lazy(() => import("./pages/productpage"));

const App: React.FC = () => {
  // useSelector
  const authData = useAppSelector((store) => store.auth);

  // useState
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect
  useEffect(() => {
    setIsAuthenticated(authData.isAuthenticated || false);
  }, [authData]);

  return (
    <Routes>
      <Route element={<Basic />}>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
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
          <Route
            path="/warehouse"
            element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingPage />}>
                  <WarehousePage />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/products"
            element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingPage />}>
                  <ProductPage />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
