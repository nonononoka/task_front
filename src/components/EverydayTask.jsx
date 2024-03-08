import { AddTask } from "../atoms/AddTask";
import { gql, useQuery, useMutation } from "@apollo/client";
import { formatISO } from "date-fns";

//追加分
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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

  return (
    <>
      <h1>Everyday Task</h1>
      <div>
        <Stack direction="row" spacing={2}>
          {/* Yestarday */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Yestarday
              </Typography>
            </CardContent>
            {yesterday_task.map((task) => (
              <p key={task.id}>
                <label htmlFor={task.id}>{task.name}</label>
                <input
                  id={task.id}
                  type="checkbox"
                  checked={task.isCompleted}
                  key={task.id}
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
                <button
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
                  delete
                </button>
              </p>
            ))}
            <div>
              <AddTask isTemporary={true} temporaryDate={Yesterday} />
            </div>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
          {/* Today */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Today
              </Typography>
            </CardContent>
            {today_task.map((task) => (
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
                <button
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
                  delete
                </button>
              </p>
            ))}
            <div>
              <AddTask isTemporary={true} temporaryDate={Today} />
            </div>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
          {/* Tommorow */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Tomorrow
              </Typography>
            </CardContent>
            {tomorrow_task.map((task) => (
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
                <button
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
                  delete
                </button>
              </p>
            ))}
            <div>
              <AddTask isTemporary={true} temporaryDate={Tomorrow} />
            </div>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </Stack>
      </div>
    </>
  );
};

export default EverydayTask;
