import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  /* ↓state変数を定義 */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <>
      <h1>ログインページ</h1>
      <span className="input-group-btn">
        <Link to="/SignUp">Click to Signup</Link>
      </span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          {/* ↓「value」と「onChange」を追加 */}
          <input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          {/* ↓「value」と「onChange」を追加 */}
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button>ログイン</button>
      </form>
    </>
  );
};
