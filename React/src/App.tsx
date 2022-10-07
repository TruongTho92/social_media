import "antd/dist/antd.css";
import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import Header from "./components/Header";
import { loadUserAsync } from "./features/User/UserSlice";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import PrivateRoutes from "./utils/PrivateRoutes";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = Boolean(sessionStorage.getItem("access_token"));

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  return (
    <div className="App">
      {token && <Header />}

      <Routes>
        <Route path="/*" element={token ? <NotFound /> : <Auth />} />

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
