import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 shadow-md sticky top-0 bg-white z-50">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-2">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="logo"
                />
              </div>
            </div>
            <h1 className="font-semibold text-xl cursor-pointer">
              {localStorage.getItem("username")}
              <p className="text-sm">Social Media</p>
            </h1>
          </div>
          <div>
            <ul className="flex space-x-8 font-medium">
              {isLoggedIn ? (
                <NavLink to="/logout">Logout</NavLink>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Navbar;
