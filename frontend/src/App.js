import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import UserManagementPage from "./components/userspage/UserManagementPage";
import UpdateUser from "./components/userspage/UpdateUser";
import RegistrationPage from "./components/auth/RegistrationPage";
import ProfilePage from "./components/userspage/ProfilePage";
import LoginPage from "./components/auth/LoginPage";
import Footer from "./components/common/Footer";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/context/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes wrapped with Route and PrivateRoute */}
              <Route
                path="/profile"
                element={<PrivateRoute element={<ProfilePage />} />}
              />
              <Route
                path="/register"
                element={<PrivateRoute element={<RegistrationPage />} />}
              />
              <Route
                path="/admin/user-management"
                element={<PrivateRoute element={<UserManagementPage />} />}
              />
              <Route
                path="/update-user/:userId"
                element={<PrivateRoute element={<UpdateUser />} />}
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
