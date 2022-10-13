import "antd/dist/antd.css";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import PostDetail from "./components/PostDetail";
import UpdateProfile from "./components/UpdateProfile";
import { loadUser } from "./features/User/UserApi";
import { getAuthenticated } from "./features/User/UserSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostCreate from "./pages/PostCreate";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(getAuthenticated);

  const token = Cookies.get("access_token");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      {token && <Header />}

      <Routes>
        {/* AUTH */}
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <NotFound /> : <Register />} />

        <Route path="chat" element={token ? <Chat /> : <Login />} />

        {/* POST */}
        <Route
          path="create-post"
          element={token ? <PostCreate /> : <Login />}
        />

        <Route path="posts/:id" element={token ? <PostDetail /> : <Login />} />

        {/* PROFILE */}
        <Route path="profile" element={token ? <Profile /> : <Login />}></Route>
        <Route
          path="profile/update"
          element={token ? <UpdateProfile /> : <Login />}
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
