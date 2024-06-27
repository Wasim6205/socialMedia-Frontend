import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [token,setToken] = useState(localStorage.getItem("token"))

  
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  const storeUsernameInLS = (username) => {
    return localStorage.setItem("username", username);
  };

  let isLoggedIn = !!token
  console.log("isLoggedIn",isLoggedIn);

  // logout Functionality
  const LogoutUser = () => {
    setToken("")
    toast.success("user logged out")
    return localStorage.removeItem("token")
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, storeUsernameInLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
