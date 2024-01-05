import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostNewItemPage from "./pages/PostNewItemPage";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MyAccount from "./pages/MyAccountPage";

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [authenticated, setAuthenticated] = useState(user ? true : false);
  const shouldShowHeaderFooter = (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/"
  );

  return (
    <div className="App">
      <ToastContainer />
      {!shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Navigate to="/home" /> : <Navigate to="/signup" />}
        />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/home" /> : <AuthPage setAuthenticated={setAuthenticated} />}
        />
        <Route
          path="/signup"
          element={authenticated ? <Navigate to="/home" /> : <AuthPage setAuthenticated={setAuthenticated} />}
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/home"
          element={authenticated ? <Home /> : <Navigate to="/signup" />}
        />
        <Route
          path="/post-new-item"
          element={authenticated ? <PostNewItemPage /> : <Navigate to="/signup" />}
        />
         <Route
          path="/my-account"
          element={authenticated ? <MyAccount setAuthenticated={setAuthenticated}/> : <Navigate to="/signup" />}
        />
      </Routes>
      {!shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
