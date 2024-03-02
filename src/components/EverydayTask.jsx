const EverydayTask = () => {
  const taskCard = {
    yesterday: [
      { name: "task1", priority: "high", category: "hobbby" },
      { name: "task2", priority: "middle", category: "hobbby" },
    ],
    today: [
      { name: "task1", priority: "high", category: "hobbby" },
      { name: "task2", priority: "middle", category: "hobbby" },
    ],
    tomorrow: [
      { name: "task1", priority: "high", category: "hobbby" },
      { name: "task2", priority: "middle", category: "hobbby" },
    ],
  };

  const urgentTask = {
    first: {
      name: "task1",
      priority: "high",
      category: "hobbby",
      limit: "3/2",
    },
    second: {
      name: "task1",
      priority: "high",
      category: "hobbby",
      limit: "3/3",
    },
    third: {
      name: "task1",
      priority: "high",
      category: "hobbby",
      limit: "3/4",
    },
  };

  return (
    <>
      <div>
        <h1>everyday task</h1>
        <div>
          <h4>yesterday</h4>
          {taskCard.yesterday.map((task) => {
            return (
              <>
                <p>name:{task.name}</p>
                <p>priority:{task.priority}</p>
                <p>category:{task.category}</p>
              </>
            );
          })}
          <h4>today</h4>
          {taskCard.today.map((task) => {
            return (
              <>
                <p>name:{task.name}</p>
                <p>priority:{task.priority}</p>
                <p>category:{task.category}</p>
              </>
            );
          })}
          <h4>tomorrow</h4>
          {taskCard.tomorrow.map((task) => {
            return (
              <>
                <p>name:{task.name}</p>
                <p>priority:{task.priority}</p>
                <p>category:{task.category}</p>
              </>
            );
          })}
        </div>
      </div>

      <div>
        <h3>urgent task</h3>
        <p>
          1:{urgentTask.first.name},{urgentTask.first.limit}
        </p>
        <p>
          2:{urgentTask.second.name},{urgentTask.second.limit}
        </p>
        <p>
          3:{urgentTask.third.name},{urgentTask.third.limit}
        </p>
      </div>
    </>
  );
};

export default EverydayTask;
