import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SidebarInfo from "./SidebarInfo";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar">

      {/* ✅ NOT LOGGED IN */}
      {!user && <SidebarInfo />}

      {/* ================= ADMIN ================= */}
      {user?.role === "ADMIN" && (
        <>
          <NavLink to="/admin" className="sidebar-btn">
            Dashboard
          </NavLink>

          <NavLink to="/admin/types" className="sidebar-btn">
            Appointment Types
          </NavLink>

          <NavLink to="/admin/manage" className="sidebar-btn">
            Manage Appointments
          </NavLink>

          {/* ✅ FIXED ROUTE */}
          <NavLink to="/admin/all" className="sidebar-btn">
            All Appointments
          </NavLink>
        </>
      )}

      {/* ================= CUSTOMER ================= */}
      {user?.role === "CUSTOMER" && (
        <>
          <NavLink to="/customer" className="sidebar-btn">
            Dashboard
          </NavLink>

          <NavLink to="/customer/book" className="sidebar-btn">
            Book Appointment
          </NavLink>

          <NavLink to="/customer/my" className="sidebar-btn">
            My Appointments
          </NavLink>
        </>
      )}

    </aside>
  );
};

export default Sidebar;