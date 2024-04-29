import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import React, { useState, useEffect } from "react";
export const AuthContext = React.createContext();
import App from "../AppRouter.jsx";

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        console.log(token)
        setIdToken(token);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
      <App idToken={idToken} />
    </AuthContext.Provider>
  );
};
