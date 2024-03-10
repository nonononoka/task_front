import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Pomodoro = () => {
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
  });

  console.log(pomodoroTask);

  return (
    <div>
      <button
        onClick={() => {
          changePomodoro({
            variables: {
              input: {
                id: pomodoroTask[0].id,
                isPomodoro: false,
              },
            },
          });
          navigate("/EveryDayTask");
        }}
      >
        Reset
      </button>
      <p>{pomodoroTask[0].name}</p>
    </div>
  );
};

export default Pomodoro;
