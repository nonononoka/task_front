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
      width: "200px",
      height: "200px",
      overflow: "auto",
      backgroundColor: "lightblue", // 背景色を指定
    },
    font_size: "14px",
    item_xs0: "8px",
    item_xs1: "4px",
  };

  const todayObj = {
    title: "Today",
    task: today_task,
    sx: {
      width: "300px",
      height: "300px",
      overflow: "auto",
      backgroundColor: "lightyellow", // 背景色を指定
    },
    font_size: "21px",
    item_xs0: "7px",
    item_xs1: "5px",
  };

  const tomorrowObj = {
    title: "Tomorrow",
    task: tomorrow_task,
    sx: {
      width: "200px",
      height: "200px",
      overflow: "auto",
      backgroundColor: "lightblue", // 背景色を指定
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
                      <Typography
                        sx={obj.font_size}
                        color="text.secondary"
                        gutterBottom
                      >
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
                {obj.task.map((task) => (
                  <p key={task.id}>
                    <label htmlFor={task.id}>{task.name}</label>
                    <input
                      id={task.id}
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() =>
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
                    />
                    {task.priority && <p>priority:{task.priority}</p>}
                    {task.category && <p>category:{task.category}</p>}
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
                  </p>
                ))}
              </Card>
            </>
          ))}
        </Stack>
      </div>
    </>
  );
};

export default EverydayTask;
