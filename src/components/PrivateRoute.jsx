import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth.jsx";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setAuthChecked(true);
    });
  }, [setUser]);

  if (authChecked) {
    if (user) {
      return <>{children}</>;
    } else {
      return <Navigate replace to="/Login" />;
    }
  } else {
    return <></>;
  }
};

export default PrivateRoute;
