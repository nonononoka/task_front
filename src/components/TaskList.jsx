import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskList = () => {
  const [val, setVal] = useState("");
  const clearVal = () => setVal("");

  const ADD_TASK_MUTATION = gql`
    mutation Mutation($input: AddTaskInput!) {
      addTask(input: $input) {
        name
        id
        limitDate
      }
    }
  `;

  const REMOVE_ALL_TASKS_MUTATION = gql`
    mutation Mutation {
      removeAllTasks
    }
  `;

  const ALL_TASKS = gql`
    query AllTasks {
      allTasks {
        id
        name
        postedBy
        limitDate
      }
    }
  `;

  const { loading, data, error } = useQuery(ALL_TASKS);
  const Today = new Date();
  const [date, setDate] = useState(Today);
  console.log(date);

  const [addTask] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });
  const [removeAllTasks] = useMutation(REMOVE_ALL_TASKS_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });
  if (error) {
    console.log(error.message);
  }

  if (loading || error) return <></>;

  return (
    <>
      <h1>task list</h1>
      <input
        placeholder="your task"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div>
        <DatePicker
          showIcon
          selected={date}
          onChange={(selectedDate) => {
            setDate(selectedDate || Today);
          }}
        />
      </div>
      <button onClick={clearVal}>clear</button>
      <button
        onClick={() =>
          addTask({
            variables: {
              input: {
                name: val,
                limitDate: date.toISOString(),
              },
            },
          })
        }
      >
        add Task
      </button>
      <div>
        {data.allTasks.map((task) => (
          <>
            <p key={task.id}>
              name: {task.name} limit: {task.limitDate.split("T")[0]}
            </p>
          </>
        ))}
      </div>
      <button onClick={() => removeAllTasks()}>delete all tasks</button>
    </>
  );
};

export default TaskList;
