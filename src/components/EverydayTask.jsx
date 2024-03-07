import { AddTask } from "../atoms/AddTask";
import { gql, useQuery } from "@apollo/client";

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
      }
    }
  `;

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

  const yesterday_task = data.allRegisteredShortTasks.filter((task) =>
    isDateMatched(task.expirationDate, Yesterday.toISOString())
  );
  const today_task = data.allRegisteredShortTasks.filter((task) =>
    isDateMatched(task.expirationDate, Today.toISOString())
  );
  const tomorrow_task = data.allRegisteredShortTasks.filter((task) =>
    isDateMatched(task.expirationDate, Tomorrow.toISOString())
  );

  return (
    <>
      <h1>Everyday Task</h1>
      <div>
        <h2>yesterday</h2>
        <>
          {yesterday_task.map((task) => (
            <p key={task.id}>{task.name}</p>
          ))}
          <AddTask isTemporary={true} temporaryDate={Yesterday} />
        </>
      </div>
      <div>
        <h2>today</h2>
        <>
          {today_task.map((task) => (
            <p key={task.id}>{task.name}</p>
          ))}
          <AddTask isTemporary={true} temporaryDate={Today} />
        </>
      </div>
      <div>
        <h2>tomorrow</h2>
        <>
          {tomorrow_task.map((task) => (
            <p key={task.id}>{task.name}</p>
          ))}
          <AddTask isTemporary={true} temporaryDate={Tomorrow} />
        </>
      </div>
    </>
  );
};

export default EverydayTask;
