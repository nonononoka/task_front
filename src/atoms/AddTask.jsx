import { gql, useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const AddTask = ({ isTemporary, temporaryDate }) => {
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

  const ALL_TASKS = gql`
    query AllTasks {
      allRegisteredTasks {
        id
        limitDate
        name
        isTemporary
      }
    }
  `;

  const [date, setDate] = useState(temporaryDate);
  const [val, setVal] = useState("");

  const clearVal = () => setVal("");

  const [addTask] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });

  return (
    <>
      <input
        placeholder="your task"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      {!isTemporary && (
        <>
          <div>
            <DatePicker
              showIcon
              selected={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
              }}
            />
          </div>
          <div>
            <button onClick={() => setDate(null)}>日付を設定しない</button>
          </div>
        </>
      )}
      <button onClick={clearVal}>clear</button>
      <button
        onClick={() =>
          addTask({
            variables: {
              input: {
                name: val,
                limitDate: date ? date.toISOString() : null,
                isTemporary: isTemporary,
              },
            },
          })
        }
      >
        add Task
      </button>
    </>
  );
};
