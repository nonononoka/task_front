// Components
import { DailyTask } from "../domain/objects";

export const DailyTaskContainer = () => {
    const Today = new Date();
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

    if (loading || error) return <></>;

    const today_task = data.allRegisteredShortTasks.filter((task) => {
        return isDateMatched(task.expirationDate, formatISO(Today));
    });

    const priorities = ["LOW", "MIDDLE", "HIGH"];
    const compareReturn = (v1, v2) => {
        if (v1 == v2) {
            return 0;
        }
        return priorities.indexOf(v1) > priorities.indexOf(v2) ? -1 : 1;
    };

    const sorted_today_task = today_task.sort(function (a, b) {
        return compareReturn(a.priority, b.priority);
    });

    const obj = {
        Date: Today,
        title: "Today",
        task: sorted_today_task,
        sx: {
            width: "35%",
            height: "400px",
            overflow: "auto",
            backgroundColor: "white", // 背景色を指定
        },
        font_size: "21px",
        item_xs0: "7px",
        item_xs1: "5px",
        font_weight: "bold",
    };

    return (
        <>
            <DailyTask {...obj} />
        </>
    )
}