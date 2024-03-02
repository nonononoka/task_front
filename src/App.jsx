import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAccount from "./components/UserAccount";
import TimeLine from "./components/TimeLine";
import EverydayTask from "./components/EverydayTask";
import TaskList from "./components/TaskList";
import Menu from "./components/Menu";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/UserAccount" element={<UserAccount />} />
        <Route path="/TimeLine" element={<TimeLine />} />
        <Route path="/" element={<EverydayTask />} />
        <Route path="/TaskList" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
