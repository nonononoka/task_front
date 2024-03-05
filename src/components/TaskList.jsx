import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskList = () => {
  const [val, setVal] = useState("");
  const clearVal = () => setVal("");

  const ADD_TASK_MUTATION = gql`
    mutation RegisterTask($input: AddTaskInput!) {
      registerTask(input: $input) {
        id
        limitDate
        name
        postedBy
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
      allRegisteredTasks {
        limitDate
        name
      }
    }
  `;

  const { loading, data, error } = useQuery(ALL_TASKS);
  const Today = new Date();
  const [date, setDate] = useState(Today);

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
      <div>
        <button onClick={() => setDate(null)}>日付を設定しない</button>
      </div>
      <button onClick={clearVal}>clear</button>
      <button
        onClick={() =>
          addTask({
            variables: {
              input: {
                name: val,
                limitDate: date ? date.toISOString() : null,
              },
            },
          })
        }
      >
        add Task
      </button>
      <div>
        {data.allRegisteredTasks.map((task) => (
          <>
            <p key={task.id}>name: {task.name} </p>
            {task.limitDate && <p>limit:{task.limitDate.split("T")[0]}</p>}
          </>
        ))}
      </div>
      <button onClick={() => removeAllTasks()}>delete all tasks</button>
    </>
  );
};

export default TaskList;
