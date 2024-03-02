import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAccount from "./components/UserAccount";
import TimeLine from "./components/TimeLine";
import EverydayTask from "./components/EverydayTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account" element={<UserAccount />} />
        <Route path="/timeline" element={<TimeLine />} />
        <Route path="/everydaytask" element={<EverydayTask />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
