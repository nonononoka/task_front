import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const EverydayTask = () => {
  const [val, setVal] = useState("");
  const clearVal = () => setVal("");

  const ADD_TASK_MUTATION = gql`
    mutation Mutation($input: String!) {
      addTask(input: $input) {
        id
        name
        postedBy
      }
    }
  `;

  const ALL_TASKS = gql`
    query AllTasks {
      allTasks {
        id
        name
        postedBy
      }
    }
  `;

  const { loading, data,error } = useQuery(ALL_TASKS);
  
  const [addTask] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [{ query: ALL_TASKS }],
  });

  if (loading) return <p>Loading...</p>;
  if(error) return <p>error</p>

  console.log(data)

  return (
    <>
      <h1>everyday task</h1>
      <input
        placeholder="your task"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />

      <button onClick={clearVal}>clear</button>
      <button
        onClick={() =>
          addTask({
            variables: {
              input: val,
            },
          })
        }
      >
        add Task
      </button>
      <div>{data.allTasks.map((task) => <p key = {task.id}>{task.name}</p>)}</div>
    </>
  );
};

export default EverydayTask;
