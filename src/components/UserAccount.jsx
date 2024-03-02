import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const [user, setUser] = useState("");

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/Login/");
  };
  return (
    <>
      <h1>account</h1>
      <p>email:{user?.email}</p>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default UserAccount;
