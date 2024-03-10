import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAccount from "./components/UserAccount";
import Pomodoro from "./components/Pomodoro";
import Switch from "./components/Switch";
import EverydayTask from "./components/EverydayTask";
import TaskList from "./components/TaskList";
import { Menu } from "./components/Menu";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const createApolloClient = (token) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};

function App({ idToken }) {
  const client = createApolloClient(idToken);
  const elements = [
    { path: "/UserAccount", element: <UserAccount /> },
    { path: "/Pomodoro", element: <Pomodoro /> },
    { path: "/TaskList", element: <TaskList /> },
    { path: "/", element: <EverydayTask /> },
    { path: "/Switch", element: <Switch /> },
  ];

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          {elements.map((component) => {
            return (
              <Route
                key={component.path}
                path={component.path}
                element={
                  <PrivateRoute path={component.path}>
                    {component.element}
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
