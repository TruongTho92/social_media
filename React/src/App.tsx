import "antd/dist/antd.css";
import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import PrivateRoutes from "./utils/PrivateRoutes";

const App: React.FC = () => {
  const isAuthenticated = sessionStorage.getItem("user");
  return (
    <div className="App">
      {isAuthenticated && <Header />}

      <Routes>
        <Route
          path="/auth/*"
          element={isAuthenticated ? <NotFound /> : <Auth />}
        />

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
