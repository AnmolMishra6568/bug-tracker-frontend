import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bootstrap } from "./features/authSlice.js";

export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(bootstrap()); }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/tickets" element={<PrivateRoute><TicketsPage /></PrivateRoute>} />
        <Route path="/tickets/:id" element={<PrivateRoute><TicketDetail /></PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="*" element={<div className="container"><div className="card"><h3>Not Found</h3><Link to="/">Go Home</Link></div></div>} />
      </Routes>
    </div>
  );
}
