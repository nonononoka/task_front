import { gql, useMutation, useQuery } from "@apollo/client";
import { AddTask } from "../atoms/AddTask";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";

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

  //task優先度でchip背景色を切り替える関数
  const getChipBackgroundColor = (priority) => {
    switch (priority) {
      case "LOW":
        return "green";
      case "MIDDLE":
        return "orange";
      case "HIGH":
        return "red";
      default:
        return "gray"; // デフォルトの色を設定する場合
    }
  };

  //日付整える
  const formatDate = (dateString) => {
    if (!dateString) return "Timeless"; // 日付が存在しない場合は "Timeless" を表示
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "100px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div style={{ cursor: "pointer" }}>Category</div>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>
                <div style={{ cursor: "pointer" }}>Limit Date</div>
              </TableCell>
              <TableCell>
                <div style={{ cursor: "pointer" }}>Priority</div>
              </TableCell>
              <TableCell>
                <AddTask temporaryDate={Today} isTemporary={false} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.allRegisteredTasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      id={task.id}
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
                  </TableCell>
                  <TableCell>{task.category || "None"}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{formatDate(task.limitDate)}</TableCell>
                  <TableCell>
                    {task.isCompleted ? (
                      <div
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          width: "80px", // ラベルが最大の幅になるように適切な値を設定してください
                          textAlign: "center", // 必要に応じてテキストを中央揃えにします
                          borderRadius: "20px", // 丸みを帯びるように設定
                          padding: "5px", // 必要に応じて余白を追加
                        }}
                      >
                        Completed!
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: getChipBackgroundColor(
                            task.priority
                          ),
                          color: "white",
                          width: "80px", // ラベルが最大の幅になるように適切な値を設定してください
                          textAlign: "center", // 必要に応じてテキストを中央揃えにします
                          borderRadius: "20px", // 丸みを帯びるように設定
                          padding: "5px", // 必要に応じて余白を追加
                        }}
                      >
                        {task.priority}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="deleteTask"
                      onClick={() => {
                        console.log(task.id);
                        removeEachTask({
                          variables: {
                            input: {
                              id: task.id,
                              isShort: false,
                            },
                          },
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => removeAllTasks()}>Delete All Tasks</Button>
    </>
  );
};

export default TaskList;
