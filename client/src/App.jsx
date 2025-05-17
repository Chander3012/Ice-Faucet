import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "./Features/landing";
import Register from "./Features/Authencation/Register";
import Login from "./Features/Authencation/Login";
import DashboardLayout from "./components/Dashboradlayout";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Features/Dashboard";
import BreakTheIce from "./Features/games/BreaktheIce";
import EasyShortLinks from "./Features/ShortLinks/EasyShortLinks";
import HardShortlinks from "./Features/ShortLinks/HardShortLinks";
import Deposit from "./Features/Deposit";
import PTCAds from "./Features/PTC-Ads";
import Withdraw from "./Features/Withdraw";
import Referrals from "./Features/Refferals";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
     
      <Route element={<PrivateRoute>< DashboardLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/BreaktheIce" element={<BreakTheIce />} />
        <Route path="/dashboard/EasyShortLinks" element={<EasyShortLinks />} />
        <Route path="/dashboard/HardShortlinks" element={<HardShortlinks />} />
        <Route path="/dashboard/Deposit" element={<Deposit />} />
        <Route path="/dashboard/PTCAds" element={<PTCAds />} />
        <Route path="/dashboard/Withdraw" element={<Withdraw />} />
        <Route path="/dashboard/Referrals" element={<Referrals />} />

      </Route>
     
      {/* <Route path="*" element={<h1 style={{ color: "Dark" }}>404 - Page Not Found</h1>} /> */}
    </Routes>
  );
};

export default App;
