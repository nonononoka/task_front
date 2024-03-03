import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import React, { useState ,useEffect} from "react";
export const AuthContext = React.createContext();
import App from "../App";

export const Auth = ({ children }) => {
  //refetchされたら、キャッシュが更新されるから、queryが更新されてeverydaytaskが更新されるはず。
  // const { loading, data, refetch } = useQuery(ROOT_QUERY);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log(currentUser)
      if (currentUser) {
        const token = await currentUser.getIdToken();
        setIdToken(token);
      }
    });
  });

  // if (loading) {
  //   return <p>Loading users...</p>;
  // }

  return (
    <AuthContext.Provider
      value={{
        // loading,
        setUser,
        user,
      }}
    >
      {children}
      <App idToken={idToken} />
    </AuthContext.Provider>
  );
};
