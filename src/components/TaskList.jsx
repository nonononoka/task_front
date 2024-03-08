import { gql, useMutation, useQuery } from "@apollo/client";
import { AddTask } from "../atoms/AddTask";

const TaskList = () => {
  const REMOVE_ALL_TASKS_MUTATION = gql`
    mutation Mutation {
      removeAllTasks
    }
  `;

  const REMOVE_EACH_TASK_MUTATION = gql`
    mutation RemoveEachTask($input: RemoveEachTaskInput!) {
      removeEachTask(input: $input)
    }
  `;

  const ALL_TASKS = gql`
    query AllTasks {
      allRegisteredTasks {
        id
        limitDate
        name
        isCompleted
        priority
        category
      }
    }
  `;

  const CHANGE_IS_COMPLETED = gql`
    mutation ChangeCompleted($input: ChangeCompletedInput!) {
      changeCompleted(input: $input)
    }
  `;

  const [changeCompleted] = useMutation(CHANGE_IS_COMPLETED, {
    refetchQueries: [{ query: ALL_TASKS }],
  });

  const [removeEachTask] = useMutation(REMOVE_EACH_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });

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
                      isShort: false,
                      isComplete: !task.isCompleted,
                    },
                  },
                })
              }
            />
            {task.limitDate && <p>limit:{task.limitDate.split("T")[0]}</p>}
            {task.priority && <p>priority:{task.priority}</p>}
            {task.category && <p>category:{task.category}</p>}
            <button onClick = {() => removeEachTask({
              variables: {
                input: {
                  id: task.id,
                  isShort:false
                }
              }
            })}>delete</button>
          </p>
        ))}
      </div>
      <button onClick={() => removeAllTasks()}>delete all tasks</button>
    </>
  );
};

export default TaskList;
