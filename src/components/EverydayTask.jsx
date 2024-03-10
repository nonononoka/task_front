import { AddTask } from "../atoms/AddTask";
import { gql, useQuery, useMutation } from "@apollo/client";
import { formatISO } from "date-fns";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TimerIcon from "@mui/icons-material/Timer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import { TaskCard } from "../atoms/TaskCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const ALL_REGISTERED_SHORT_TASKS = gql`
    query AllTasks {
      allRegisteredShortTasks {
        id
        expirationDate
        name
        isCompleted
        isPomodoro
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

  const CHANGE_POMODORO = gql`
    mutation ChangePomodoro($input: ChangePomodoroInput!) {
      changePomodoro(input: $input)
    }
  `;

  const [changePomodoro] = useMutation(CHANGE_POMODORO, {
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
  const ALL_TASKS = gql`
    query AllTasks {
      allRegisteredTasks {
        id
        limitDate
        name
        isCompleted
        priority
        category
      }
    }
  `;

  const {
    loading: taskLoading,
    data: allRegisteredTaskData,
    error: taskError,
  } = useQuery(ALL_TASKS);

  if (error || taskError) {
    console.log(error.message);
  }

  if (loading || error || taskLoading || taskError) return <></>;

  const yesterday_task = data.allRegisteredShortTasks.filter((task) => {
    return isDateMatched(task.expirationDate, formatISO(Yesterday));
  });
  const today_task = data.allRegisteredShortTasks.filter((task) => {
    return isDateMatched(task.expirationDate, formatISO(Today));
  });
  const tomorrow_task = data.allRegisteredShortTasks.filter((task) => {
    return isDateMatched(task.expirationDate, formatISO(Tomorrow));
  });
  const priorities = ["LOW", "MIDDLE", "HIGH"];
  const compareReturn = (v1, v2) => {
    if (v1 == v2) {
      return 0;
    }
    return priorities.indexOf(v1) > priorities.indexOf(v2) ? -1 : 1;
  };

  const sorted_yesterday_task = yesterday_task.sort(function (a, b) {
    return compareReturn(a.priority, b.priority);
  });
  const sorted_today_task = today_task.sort(function (a, b) {
    return compareReturn(a.priority, b.priority);
  });
  const sorted_tomorrow_task = tomorrow_task.sort(function (a, b) {
    return compareReturn(a.priority, b.priority);
  });

  //task優先度でchip背景色を切り替える関数
  function getChipBackgroundColor(priority) {
    switch (priority) {
      case "HIGH":
        return "red"; // 高優先度の場合、赤色
      case "MIDDLE":
        return "orange"; // 中優先度の場合、オレンジ色
      case "LOW":
        return "green"; // 低優先度の場合、緑色
      default:
        return "gray"; // その他の場合、グレー色
    }
  }

  const yesterdayObj = {
    Date: Yesterday,
    title: "Yesterday",
    task: sorted_yesterday_task,
    sx: {
      width: "25%",
      height: "350px",
      overflow: "auto",
      backgroundColor: "white", // 背景色を指定
    },
    font_size: "14px",
    item_xs0: "8px",
    item_xs1: "4px",
    font_weight: "regular",
  };

  const todayObj = {
    Date: Today,
    title: "Today",
    task: sorted_today_task,
    sx: {
      width: "35%",
      height: "400px",
      overflow: "auto",
      backgroundColor: "white", // 背景色を指定
    },
    font_size: "21px",
    item_xs0: "7px",
    item_xs1: "5px",
    font_weight: "bold",
  };

  const tomorrowObj = {
    Date: Tomorrow,
    title: "Tomorrow",
    task: sorted_tomorrow_task,
    sx: {
      width: "25%",
      height: "350px",
      overflow: "auto",
      backgroundColor: "white", // 背景色を指定
    },
    font_size: "14px",
    item_xs0: "8px",
    item_xs1: "4px",
    font_weight: "regular",
  };

  //sort allRegisteredTask
  const todayRegisteredTask = allRegisteredTaskData.allRegisteredTasks.filter(
    (task) => isDateMatched(task.limitDate, Today)
  );

  return (
    <>
      <div>
        <Stack
          direction="row"
          spacing={2} //cardの間隔
          justifyContent="center" //card列を中央に配置
          marginTop="20px"
        >
          {[yesterdayObj, todayObj, tomorrowObj].map((obj) => (
            <>
              <Card sx={obj.sx}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item xs={obj.item_xs0}>
                      <Typography
                        style={{
                          fontSize: obj.font_size,
                          fontWeight: obj.font_weight,
                        }}
                        gutterBottom
                      >
                        {obj.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={obj.item_xs1}>
                      <div>
                        <AddTask isTemporary={true} temporaryDate={obj.Date} />
                      </div>
                    </Grid>
                  </Grid>
                  <List>
                    {obj.task.map((task) => {
                      const labelId = `chip-list-label-${task}`;

                      return (
                        <ListItem key={task}>
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
                            style={{
                              color: "white",
                              width: "100%",
                            }}
                          >
                            {task.isCompleted ? (
                              <Chip
                                label="Completed!"
                                style={{
                                  backgroundColor: "blue",
                                  color: "white",
                                  width: "100px",
                                }}
                              />
                            ) : (
                              <Chip
                                label={task.priority}
                                style={{
                                  backgroundColor: getChipBackgroundColor(
                                    task.priority
                                  ),
                                  color: "white",
                                  width: "100px",
                                }}
                              />
                            )}
                            <ListItemText
                              id={labelId}
                              primary={task.name}
                              style={{
                                marginLeft: "20px",
                                color: "black",
                                fontSize: obj.font_size,
                              }}
                            />
                            <IconButton
                              aria-label="addTask"
                              style={{
                                marginLeft: "20px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                changePomodoro({
                                  variables: {
                                    input: {
                                      id: task.id,
                                      isPomodoro: true,
                                    },
                                  },
                                });
                                navigate("/Pomodoro");
                              }}
                            >
                              <TimerIcon />
                            </IconButton>
                            <IconButton
                              aria-label="addTask"
                              style={{
                                marginLeft: "20px",
                              }}
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
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </>
          ))}
        </Stack>
      </div>

      <div>
        <Typography
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "40px",
            marginLeft: "250px",
            textAlign: "left",
          }}
          gutterBottom
        >
          <WarningIcon />
          Emergency
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack marginTop="10px" sx={{ width: "60%" }}>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            centeredSlides={true}
          >
            {todayRegisteredTask.map((task) => {
              return (
                <SwiperSlide key={task.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#f5faff",
                    }}
                  >
                    <Card
                      variant="outlined"
                      style={{ width: 300, height: 200 }}
                    >
                      <TaskCard
                        priority={task.priority}
                        name={task.name}
                        limitDate={task.limitDate}
                      />
                    </Card>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </div>
    </>
  );
};

export default EverydayTask;
