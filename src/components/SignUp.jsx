import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("登録");
  };

  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => [setUser(currentUser)]);
  });
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <>
      {user ? (
        <Navigate to={`/EverydayTask`} />
      ) : (
        <>
          <h1>ユーザ登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                placeholder="email"
                onChange={(event) => handleChangeEmail(event)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                onChange={(event) => handleChangePassword(event)}
              />
            </div>
            <div>
              <button>登録</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SignUp;
