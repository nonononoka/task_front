import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAccount from "./components/UserAccount";
import TimeLine from "./components/TimeLine";
import EverydayTask from "./components/EverydayTask";
import TaskList from "./components/TaskList";
import Menu from "./components/Menu";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/UserAccount" element={<UserAccount />} />
        <Route path="/TimeLine" element={<TimeLine />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/EverydayTask" element={<EverydayTask />} />
        <Route path="/TaskList" element={<TaskList />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
