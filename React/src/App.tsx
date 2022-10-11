import "antd/dist/antd.css";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import PostDetail from "./components/PostDetail";
import { loadUser } from "./features/User/UserApi";
import { getUser } from "./features/User/UserSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector(getUser);

  const token = Cookies.get("access_token");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      {token && <Header />}

      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />

        <Route path="/register" element={token ? <NotFound /> : <Register />} />

        <Route path="chat" element={token ? <Chat /> : <Login />} />
        <Route path="posts" element={token ? <Posts /> : <Login />} />
        <Route path="posts/:id" element={<PostDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
