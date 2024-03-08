import { AddTask } from "../atoms/AddTask";
import { gql, useQuery, useMutation } from "@apollo/client";
import { formatISO } from "date-fns";

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
        <h2>yesterday</h2>
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
      </div>
      <div>
        <h2>today</h2>
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
      </div>
      <div>
        <h2>tomorrow</h2>
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
      </div>
    </>
  );
};

export default EverydayTask;
