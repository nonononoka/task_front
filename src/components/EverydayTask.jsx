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

  const { data, error, loading } = useQuery(ALL_TASKS);
  if (error) {
    console.log(error.message);
  }

  if (loading || error) return <></>;

  const yesterday_task = data.allRegisteredTasks.filter(
    (task) =>
      task.isTemporary === true && task.limitDate == Yesterday.toISOString()
  );
  const today_task = data.allRegisteredTasks.filter(
    (task) => task.isTemporary === true && task.limitDate == Today.toISOString()
  );
  const tomorrow_task = data.allRegisteredTasks.filter(
    (task) =>
      task.isTemporary === true && task.limitDate == Tomorrow.toISOString()
  );

  return (
    <>
      <h1>Everyday Task</h1>
      <div>
        <h2>yesterday</h2>
        <>
          {yesterday_task.map((task) => (
            <p key={task.id}>
              {task.name}
              {task.limitDate}
            </p>
          ))}
          <AddTask isTemporary={true} temporaryDate={Yesterday} />
        </>
      </div>
      <div>
        <h2>today</h2>
        <>
          <AddTask isTemporary={true} temporaryDate={Today} />
        </>
      </div>
      <div>
        <h2>tomorrow</h2>
        <>
          <AddTask isTemporary={true} temporaryDate={Tomorrow} />
        </>
      </div>
    </>
  );
};

export default EverydayTask;
