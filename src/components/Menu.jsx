import { useNavigate } from "react-router-dom";

//追加分
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TopIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import AccountIcon from "@mui/icons-material/AccountBox";

export const Menu = () => {
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

// export const Menu = () => {
//   const navigate = useNavigate();

//   const onClickUserAccount = () => {
//     navigate("/UserAccount");
//   };

//   const onClickEverydayTask = () => {
//     navigate("/");
//   };

//   const onClickTaskList = () => {
//     navigate("/TaskList");
//   };

//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {["Top", "Task List", "Account"].map((text, index) => (
//           <ListItem key={text} disavlePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index === 0 && <TopIcon />}
//                 {index === 1 && <TaskIcon />}
//                 {index === 2 && <AccountIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>Menu</Button>
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// };
