import "antd/dist/antd.css";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import UpdateProfile from "./components/UpdateProfile";
import { userApi } from "./features/user/userApi";
import { getAuthenticated } from "./features/user/userSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostCreate from "./pages/PostCreate";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage/UpdatePasswordPage";
import UserProfilePage from "./pages/UserProfilePage";

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(getAuthenticated);

  const token = Cookies.get("access_isAuthenticated");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userApi.loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      {isAuthenticated && <Header />}

      <Routes>
        {/* AUTH */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={isAuthenticated ? <NotFound /> : <Register />}
        />

        <Route path="chat" element={isAuthenticated ? <Chat /> : <Login />} />

        {/* POST */}
        <Route
          path="create-post"
          element={isAuthenticated ? <PostCreate /> : <Login />}
        />

        {/* PROFILE */}
        <Route
          path="profile"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        <Route
          path="profile/:id"
          element={isAuthenticated ? <UserProfilePage /> : <Login />}
        />
        <Route
          path="profile/update"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="profile/update-password"
          element={isAuthenticated ? <UpdatePasswordPage /> : <Login />}
        />

        {/* SEARCH */}
        <Route
          path="search"
          element={isAuthenticated ? <SearchPage /> : <Login />}
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
