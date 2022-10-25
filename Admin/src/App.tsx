import "antd/dist/antd.css";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getAuthenticated } from "./features/Auth/userSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(getAuthenticated);

  const token = Cookies.get("access_isAuthenticated");
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <div className="App">
      <Sidebar />
      {/* {isAuthenticated && <Sidebar />} */}

      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
