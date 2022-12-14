import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Admin from "./Admin";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Intro from "./components/Intro";
import PostMainDetail from "./components/Posts/PostMain/PostMainDetail";
import { userApi } from "./features/Auth/userApi";
import { getAuthenticated } from "./features/Auth/userSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostCreate from "./pages/PostCreate";
import PostDetailPage from "./pages/PostDetailPage";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage/UpdatePasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserProfilePage from "./pages/UserProfilePage";

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(getAuthenticated);

  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userApi.loadUser());
  }, []);

  return (
    <div className="App">
      <Intro />
      <Routes location={background || location}>
        {/*===== ADMIN =====*/}
        <Route
          path="/admin/*"
          element={isAuthenticated ? <Admin /> : <Login />}
        />
        {/*===== AUTH =====*/}
        <Route path="/*" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="post-newfeeds/:id"
          element={isAuthenticated ? <PostMainDetail /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <NotFound /> : <Register />}
        />
        {/*===== CHAT =====*/}
        <Route
          path="chat"
          element={isAuthenticated ? <ChatPage /> : <Login />}
        />
        {/*===== POST =====*/}
        <Route
          path="create-post"
          element={isAuthenticated ? <PostCreate /> : <Login />}
        />
        {/*===== PROFILE =====*/}
        <Route
          path="profile/*"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        <Route
          path="account-post/:id"
          element={isAuthenticated ? <PostDetailPage /> : <Login />}
        />
        <Route
          path="profile/update"
          element={isAuthenticated ? <UpdateProfilePage /> : <Login />}
        />
        <Route
          path="profile/update-password"
          element={isAuthenticated ? <UpdatePasswordPage /> : <Login />}
        />
        {/*===== USER PROFILE =====*/}
        <Route
          path="user-profile/:id"
          element={isAuthenticated ? <UserProfilePage /> : <Login />}
        />
        {/*===== SEARCH =====*/}
        <Route
          path="search"
          element={isAuthenticated ? <SearchPage /> : <Login />}
        />
        {/*===== 404 PAGE =====*/}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/account-post/:id" element={<PostDetailPage />} />
          <Route
            path="post-newfeeds/:id"
            element={isAuthenticated ? <PostMainDetail /> : <Login />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
