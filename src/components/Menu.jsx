import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const onClickUserAccount = () => {
    navigate("/UserAccount");
  };

  const onClickEverydayTask = () => {
    navigate("/");
  };

  const onClickTaskList = () => {
    navigate("/TaskList");
  };

  const onClickTimeLine = () => {
    navigate("/TimeLine");
  };

  return (
    <div className="Home">
      <h1>Menu</h1>
      <button onClick={onClickUserAccount}>Account</button>
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
