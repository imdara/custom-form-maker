import React from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabase";

const Navbar = ({ setUser }) => {
  return (
    <div className="navContainer">
      <nav className="navbar">
        <Link className="navItem" to="/">
          Home
        </Link>
        <Link className="navItem" to="/create-form">
          Create Form
        </Link>
        <Link className="navItem" to="/myforms">
          My Forms
        </Link>
        <Link
          className="navItem"
          onClick={async () => {
            await supabase.auth.signOut();
            setUser(null);
          }}
        >
          SignOut
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
