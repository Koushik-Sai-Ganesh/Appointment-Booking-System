import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/* AUTH */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

/* LANDING */
import Landing from "./pages/Landing";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppointmentTypes from "./pages/admin/AppointmentTypes";
import ManageAppointments from "./pages/admin/ManageAppointments";

/* CUSTOMER */
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookAppointment from "./pages/customer/BookAppointment";
import MyAppointments from "./pages/customer/MyAppointments";
import AppointmentList from "./pages/customer/AppointmentList";
import BookingSuccess from "./pages/customer/BookingSuccess";
import BookingFailed from "./pages/customer/BookingFailed";

/* COMMON */
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

/* LAYOUT */
const Layout = ({ children }) => (
  <>
    <Header />
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
    <Footer />
  </>
);

const App = () => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ WAIT UNTIL AUTH LOADS
  if (loading) {
    return (
      <div className="page center">
        <h2>🔄 Loading...</h2>
      </div>
    );
  }

  return (
    <Routes>

      {/* ✅ SMART ROOT ROUTE */}
      <Route
        path="/"
        element={
          user ? (
            user.role === "ADMIN" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/customer" replace />
            )
          ) : (
            <Layout><Landing /></Layout>
          )
        }
      />

      {/* ✅ AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔒 PROTECTED */}
      <Route element={<ProtectedRoute />}>

        {/* ================= ADMIN ================= */}
        <Route element={<RoleRoute role="ADMIN" />}>
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/types" element={<Layout><AppointmentTypes /></Layout>} />
          <Route path="/admin/manage" element={<Layout><ManageAppointments /></Layout>} />

          {/* ✅ FIX: ALL APPOINTMENTS MOVED HERE */}
          <Route path="/admin/all" element={<Layout><AppointmentList /></Layout>} />
        </Route>

        {/* ================= CUSTOMER ================= */}
        <Route element={<RoleRoute role="CUSTOMER" />}>
          <Route path="/customer" element={<Layout><CustomerDashboard /></Layout>} />
          <Route path="/customer/book" element={<Layout><BookAppointment /></Layout>} />
          <Route path="/customer/my" element={<Layout><MyAppointments /></Layout>} />

          {/* ❌ REMOVED from customer */}
          {/* <Route path="/customer/list" ... /> */}

          <Route path="/customer/success" element={<Layout><BookingSuccess /></Layout>} />
          <Route path="/customer/failed" element={<Layout><BookingFailed /></Layout>} />
        </Route>

      </Route>

    </Routes>
  );
};

export default App; 