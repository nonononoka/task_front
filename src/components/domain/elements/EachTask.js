import { EachTask } from "./EachTask";
import { TaskStatusButton } from "../gui/groups";
import { TaskStatusChip } from "../gui/groups";
import { TaskListIconButton } from "../gui/groups";

export const EachTask = ({ task }) => {
    const labelId = `chip-list-label-${task}`;

    //task優先度でchip背景色を切り替える関数
    function getChipBackgroundColor(priority) {
        switch (priority) {
            case "HIGH":
                return "red"; // 高優先度の場合、赤色
            case "MIDDLE":
                return "orange"; // 中優先度の場合、オレンジ色
            case "LOW":
                return "green"; // 低優先度の場合、緑色
            default:
                return "gray"; // その他の場合、グレー色
        }
    }

    const ALL_REGISTERED_SHORT_TASKS = gql`
    query AllTasks {
      allRegisteredShortTasks {
        id
        expirationDate
        name
        isCompleted
        isPomodoro
        priority
        category
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

    return (
        <ListItem key={task}>
            <TaskStatusButton handleClick={() =>
                changeCompleted({
                    variables: {
                        input: {
                            id: task.id,
                            isShort: true,
                            isComplete: !task.isCompleted,
                        },
                    },
                })} style={{
                    color: "white",
                    width: "100%"
                }}>
                {task.isCompleted ? (
                    <TaskStatusChip
                        label="Completed!"
                        style={{
                            backgroundColor: "blue",
                            color: "white",
                            width: "100px",
                        }}
                    />
                ) : (
                    <TaskStatusChip
                        label={task.priority}
                        style={{
                            backgroundColor: getChipBackgroundColor(
                                task.priority
                            ),
                            color: "white",
                            width: "100px",
                        }}
                    />
                )}
                <TaskNameText
                    labelId={labelId}
                    taskName={task.name}
                    style={{
                        marginLeft: "20px",
                        color: "black",
                        fontSize: font_size,
                    }}
                />
                <TaskListIconButton label="addTask"
                    handleClick={
                        (e) => {
                            e.stopPropagation();
                            changePomodoro({
                                variables: {
                                    input: {
                                        id: task.id,
                                        isPomodoro: true,
                                    },
                                },
                            });
                            navigate("/Pomodoro");
                        }
                    }>
                    <TimerIcon />
                </TaskListIconButton>
                <TaskListIconButton label="removeTask"
                    handleClick={
                        () => {
                            removeEachTask({
                                variables: {
                                    input: {
                                        id: task.id,
                                        isShort: true,
                                    },
                                },
                            })
                        }
                    }>
                    <DeleteIcon />
                </TaskListIconButton>
            </TaskStatusButton>
        </ListItem >
    );
}