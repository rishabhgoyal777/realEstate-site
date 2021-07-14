import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            {" "}
            Real estate
          </Link>
          {localStorage.getItem("jwt") && (
            <Link to="/admin/home" className="btn btn-outline-success">
              admin page
            </Link>
          )}
          {localStorage.getItem("jwt") && (
            <button
              className="btn btn-outline-success"
              onClick={() => {
                localStorage.clear();
                window.location.reload(false);
                history.push("/");
              }}
            >
              Logout
            </button>
          )}
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
