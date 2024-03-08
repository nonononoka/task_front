import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { Me } from "../query.js";
import { useQuery } from "@apollo/client";

const UserAccount = () => {
  const { loading, data } = useQuery(Me);
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  const { email } = data.me;
  const logout = async () => {
    await signOut(auth);
    //return back to the authentication page
    navigate("/");
  };
  return (
    <>
      <p>email: {email}</p>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default UserAccount;
