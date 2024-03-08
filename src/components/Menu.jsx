import { useNavigate } from "react-router-dom";
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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

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

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logout = async () => {
    await signOut(auth);
    //return back to the authentication page
    navigate("/");
  };

  const DrawerList = (

      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          {[
            ["Top", onClickEverydayTask],
            ["Task List", onClickTaskList],
            ["Account", onClickUserAccount],
          ].map((menu, index) => (
            <ListItem key={menu[0]} disavlePadding>
              <ListItemButton onClick={menu[1]}>
                <ListItemIcon>
                  {index === 0 && <TopIcon />}
                  {index === 1 && <TaskIcon />}
                  {index === 2 && <AccountIcon />}
                </ListItemIcon>
                <ListItemText primary={menu[0]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" onClick = {logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
    </>
  );
};
