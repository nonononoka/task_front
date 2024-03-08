import { AddTask } from "../atoms/AddTask";
import { gql, useQuery, useMutation } from "@apollo/client";
import { formatISO } from "date-fns";

//追加分
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const EverydayTask = () => {
  const Today = new Date();
  const Yesterday = new Date(
    Today.getFullYear(),
    Today.getMonth(),
    Today.getDate() - 1
  );
  const Tomorrow = new Date(
    Today.getFullYear(),
    Today.getMonth(),
    Today.getDate() + 1
  );

  const ALL_REGISTERED_SHORT_TASKS = gql`
    query AllTasks {
      allRegisteredShortTasks {
        id
        expirationDate
        name
        isCompleted
        priority
        category
      }
    }
  `;

  const REMOVE_EACH_TASK_MUTATION = gql`
    mutation RemoveEachTask($input: RemoveEachTaskInput!) {
      removeEachTask(input: $input)
    }
  `;

  const [removeEachTask] = useMutation(REMOVE_EACH_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_REGISTERED_SHORT_TASKS }],
  });

  const CHANGE_IS_COMPLETED = gql`
    mutation ChangeCompleted($input: ChangeCompletedInput!) {
      changeCompleted(input: $input)
    }
  `;

  const [changeCompleted] = useMutation(CHANGE_IS_COMPLETED, {
    refetchQueries: [{ query: ALL_REGISTERED_SHORT_TASKS }],
  });

  const isDateMatched = (taskExpirationDate, date) => {
    const taskDateObj = new Date(taskExpirationDate);
    const dateObj = new Date(date);
    return (
      taskDateObj.getFullYear() == dateObj.getFullYear() &&
      taskDateObj.getMonth() == dateObj.getMonth() &&
      taskDateObj.getDay() == dateObj.getDay()
    );
  };

  const { data, error, loading } = useQuery(ALL_REGISTERED_SHORT_TASKS);
  if (error) {
    console.log(error.message);
  }

  if (loading || error) return <></>;

  const yesterday_task = data.allRegisteredShortTasks.filter((task) => {
    return isDateMatched(task.expirationDate, formatISO(Yesterday), task);
  });
  const today_task = data.allRegisteredShortTasks.filter((task) => {
    return isDateMatched(task.expirationDate, formatISO(Today), task);
  });
  const tomorrow_task = data.allRegisteredShortTasks.filter((task) => {
    return isDateMatched(task.expirationDate, formatISO(Tomorrow), task);
  });

  const yesterdayObj = {
    title: "Yesterday",
    task: yesterday_task,
    sx: {
      width: "300px",
      height: "200px",
      overflow: "auto",
      backgroundColor: "white", // 背景色を指定
    },
    font_size: "14px",
    item_xs0: "8px",
    item_xs1: "4px",
  };

  const todayObj = {
    title: "Today",
    task: today_task,
    sx: {
      width: "400px",
      height: "300px",
      overflow: "auto",
      backgroundColor: "white", // 背景色を指定
    },
    font_size: "21px",
    item_xs0: "7px",
    item_xs1: "5px",
  };

  const tomorrowObj = {
    title: "Tomorrow",
    task: tomorrow_task,
    sx: {
      width: "300px",
      height: "200px",
      overflow: "auto",
      backgroundColor: "white", // 背景色を指定
    },
    font_size: "14px",
    item_xs0: "8px",
    item_xs1: "4px",
  };

  return (
    <>
      <div>
        <Stack
          direction="row"
          spacing={2} //cardの間隔
          justifyContent="center" //card列を中央に配置
          marginTop="50px"
        >
          {[yesterdayObj, todayObj, tomorrowObj].map((obj) => (
            <>
              <Card sx={obj.sx}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item xs={obj.item_xs0}>
                      <Typography sx={obj.font_size} gutterBottom>
                        {obj.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={obj.item_xs1}>
                      <div>
                        <AddTask isTemporary={true} temporaryDate={Yesterday} />
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    // bgcolor: "background.paper",
                  }}
                >
                  {obj.task.map((task) => {
                    const labelId = `checkbox-list-label-${task}`;

                    return (
                      <ListItem
                        key={task}
                        secondaryAction={
                          <IconButton
                            aria-label="addTask"
                            onClick={() =>
                              removeEachTask({
                                variables: {
                                  input: {
                                    id: task.id,
                                    isShort: true,
                                  },
                                },
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={() =>
                            changeCompleted({
                              variables: {
                                input: {
                                  id: task.id,
                                  isShort: true,
                                  isComplete: !task.isCompleted,
                                },
                              },
                            })
                          }
                          dense
                        >
                          <ListItemIcon>
                            {/* <Checkbox
                              edge="start"
                              checked={task.isCompleted}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            /> */}
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={task.name}
                            style={{ color: "Red" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            </>
          ))}
        </Stack>
      </div>
    </>
  );
};

export default EverydayTask;
