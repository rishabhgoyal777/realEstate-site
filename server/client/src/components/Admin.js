import React from "react";
import HomeProtected from "./ProtectedRoute/HomeProtected";
import Login from "./ProtectedRoute/Login";
import { withRouter } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default withRouter(Admin);
