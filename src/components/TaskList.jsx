import { gql, useMutation, useQuery } from "@apollo/client";
import { AddTask } from "../atoms/AddTask";

const TaskList = () => {
  const REMOVE_ALL_TASKS_MUTATION = gql`
    mutation Mutation {
      removeAllTasks
    }
  `;

  const ALL_TASKS = gql`
    query AllTasks {
      allRegisteredTasks {
        id
        limitDate
        name
      }
    }
  `;

  const { loading, data, error } = useQuery(ALL_TASKS);

  const [removeAllTasks] = useMutation(REMOVE_ALL_TASKS_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });
  if (error) {
    console.log(error.message);
  }

  if (loading || error) return <></>;
  const Today = new Date();

  return (
    <>
      <h1>task list</h1>
      <AddTask temporaryDate={Today} isTemporary={false} />
      <div>
        {data.allRegisteredTasks.map((task) => (
          <>
            <p key={task.id}>name: {task.name} </p>
            {task.limitDate && (
              <p key={task.id}>limit:{task.limitDate.split("T")[0]}</p>
            )}
          </>
        ))}
      </div>
      <button onClick={() => removeAllTasks()}>delete all tasks</button>
    </>
  );
};

export default TaskList;
