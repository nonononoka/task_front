import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    //return back to the authentication page
    navigate("/");
  };
  return (
    <>
      <h1>account</h1>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default UserAccount;
