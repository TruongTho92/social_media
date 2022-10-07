import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import { getUserLogin, loadUserAsync } from "./features/User/UserSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector(getUserLogin);
  const token = Boolean(sessionStorage.getItem("access_token"));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  return (
    <div className="App">
      {token && <Header />}

      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />

        <Route path="register" element={<Register />} />

        <Route path="chat" element={isAuthenticated ? <Chat /> : <Login />} />
        <Route path="posts" element={isAuthenticated ? <Posts /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
