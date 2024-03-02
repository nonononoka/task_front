import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const onClickAccount = () => {
    navigate("/Account");
  };

  const onClickEverydayTask = () => {
    navigate("/");
  };

  const onClickTaskList = () => {
    navigate("/TaskList");
  };

  const onClickTimeLine = () => {
    navigate("/Timeline");
  };

  return (
    <div className="Home">
      <h1>Home Page</h1>
      <button onClick={onClickAccount}>Account</button>
      <p></p>
      <button onClick={onClickTimeLine}>Timeline</button>
      <p></p>
      <button onClick={onClickEverydayTask}>everyday task</button>
      <p></p>
      <button onClick={onClickTaskList}>task list</button>
    </div>
  );
};

export default Menu;
