import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";

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
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: "50px" }}>
            <TextField
              label="email"
              name="email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              sx={{ width: "300px" }}
              variant="outlined"
            />
          </div>
          <div style={{ marginTop: "50px" }}>
            <TextField
              label="password"
              name="password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              sx={{ width: "300px" }}
              variant="outlined"
            />
          </div>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "50px" }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "50px" }}
              onClick={() => navigate("/SignUp")}
            >
              Sign up
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};
