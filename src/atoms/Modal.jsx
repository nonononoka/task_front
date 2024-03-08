import { gql, useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { formatISO } from "date-fns";
import "./Modal.css";

export const AddTaskModal = ({
  isTemporary,
  temporaryDate,
  handleCloseClick,
}) => {
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

  const ADD_SHORT_TASK_MUTATION = gql`
    mutation RegisterTask($input: AddShortTaskInput!) {
      registerShortTask(input: $input) {
        id
        expirationDate
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
        isCompleted
      }
    }
  `;

  const ALL_REGISTERED_SHORT_TASKS = gql`
    query AllTasks {
      allRegisteredShortTasks {
        id
        expirationDate
        name
        isCompleted
      }
    }
  `;

  const [date, setDate] = useState(temporaryDate);
  const [priority, setPriority] = useState("HIGH");
  const [val, setVal] = useState("");

  const clearVal = () => setVal("");

  const [addTask] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });

  const [addShortTask] = useMutation(ADD_SHORT_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_REGISTERED_SHORT_TASKS }],
  });

  return (
    <div className="modal">
      <div className="modal__content">
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
        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="HIGH">HIGH</option>
            <option value="MIDDLE">MIDDLE</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
        <button onClick={handleCloseClick}>back</button>
        <button
          onClick={() => {
            handleCloseClick();
            isTemporary
              ? addShortTask({
                  variables: {
                    input: {
                      name: val,
                      expirationDate: formatISO(temporaryDate),
                      priority: priority,
                    },
                  },
                })
              : addTask({
                  variables: {
                    input: {
                      name: val,
                      limitDate: date ? date.toISOString() : null,
                      priority: priority,
                    },
                  },
                });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};
