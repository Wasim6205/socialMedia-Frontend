import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { baseUrl } from "../Urls";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const {storeTokenInLS, storeUsernameInLS} = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/login`,
        formData
      );
      console.log(res.data.data.username);
      storeUsernameInLS(res.data.data.username)
      toast.success(res.data.msg);
      storeTokenInLS(res.data.token)
      navigate("/");
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex bg-slate-800 text-gray-300 h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border border-white flex flex-col px-6 py-2 rounded-md space-y-3 w-96"
      >
        <label className="input input-bordered bg-slate-800 border-gray-300 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered bg-slate-800 border-gray-300 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </label>
        <NavLink to='/forgot-password' className="text-blue-500 underline cursor-pointer ml-1">forgot password</NavLink>
        <div className="flex justify-between">
        <p>New user? <NavLink to='/register' className="text-blue-500 underline cursor-pointer ml-1">Signup</NavLink></p>
          <button
            type="submit"
            className="text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
