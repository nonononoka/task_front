import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useCallback } from "react";
import "./PomodoroStyle.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { TaskCard } from "../atoms/TaskCard";

export const Pomodoro = () => {
  const children = useCallback(({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes == 0 ? "00" : minutes}:${seconds == 0 ? "00" : seconds}`;
  }, []);
  let isWorking = true;
  const [isActive, setIsActive] = useState(false);
  const handleStartPause = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

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

  const CHANGE_POMODORO = gql`
    mutation ChangePomodoro($input: ChangePomodoroInput!) {
      changePomodoro(input: $input)
    }
  `;

  const [changePomodoro] = useMutation(CHANGE_POMODORO, {
    refetchQueries: [{ query: ALL_REGISTERED_SHORT_TASKS }],
  });

  const { data, error, loading } = useQuery(ALL_REGISTERED_SHORT_TASKS);

  if (error) {
    console.log(error.message);
  }

  if (loading || error) return <></>;

  const pomodoroTask = data.allRegisteredShortTasks.filter((task) => {
    return task.isPomodoro;
  })[0];

  return (
    <div className="App">
      <h1>{isWorking ? "Work" : "Break"}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Card
        onClick={() => {}}
        variant="outlined"
        style={{ width: 300, height: 200 }}
      >
        <TaskCard
          priority={pomodoroTask.priority}
          name={pomodoroTask.name}
          limitDate={pomodoroTask.limitDate}
        />
      </Card>
      </div>

      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying={isActive}
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[1500, 1100, 500, 0]}
          size="180"
          onComplete={() => {
            isWorking = !isWorking;
            return {
              shouldRepeat: true,
              newInitialRemainingTime: isWorking ? 10 : 5,
            };
          }}
        >
          {children}
        </CountdownCircleTimer>
      </div>

      <Grid container spacing={2} justifyContent="center" sx ={{marginTop:"50px"}}>
        <Grid item>
          <Button variant="contained" onClick={handleStartPause}>
            {isActive ? "Pause" : "Start"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              changePomodoro({
                variables: {
                  input: {
                    id: pomodoroTask.id,
                    isPomodoro: false,
                  },
                },
              });
              navigate("/");
            }}
          >
            Finish
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
