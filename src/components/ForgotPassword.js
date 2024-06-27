import React, { useState } from "react";
import axios from "axios";
import {baseUrl} from "../Urls"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/forgot-password`,
        { email }
      );
      alert(res.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
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
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="grow"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" className="text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
