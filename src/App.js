import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostNewItemPage from "./pages/PostNewItemPage";

function App() {
  const location = useLocation();
  // const user = JSON.parse(localStorage.getItem("user"));
  // const [authenticated, setAuthenticated] = useState(user ? true : false);
  const [authenticated, setAuthenticated] = useState(true);
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
          element={authenticated ? <Home /> : <Navigate to="/signup" />}
        />
        <Route
          path="/home"
          element={authenticated ? <Home /> : <Navigate to="/signup" />}
        />
        <Route
          path="/post-new-item"
          element={authenticated ? <PostNewItemPage /> : <Navigate to="/signup" />}
        />
      </Routes>
      {!shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
