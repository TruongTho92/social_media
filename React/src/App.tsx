import "antd/dist/antd.css";
import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import PrivateRoutes from "./utils/PrivateRoutes";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import Auth from "./pages/Auth";

const App: React.FC = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="App">
      {user && <Header />}

      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="posts" element={<Posts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
