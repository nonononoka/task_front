// Components
import { DailyTask } from "../domain/objects";
import { useAllRegisteredShortTasks } from "../../useCase/query/allRegisteredShortTasks";
import { formatISO } from "date-fns";

export const DailyTaskContainer = () => {
    const priorities = ["LOW", "MIDDLE", "HIGH"];
    const compareReturn = (v1, v2) => {
        if (v1 == v2) {
            return 0;
        }
        return priorities.indexOf(v1) > priorities.indexOf(v2) ? -1 : 1;
    };
    
    const Today = new Date();

    const isDateMatched = (taskExpirationDate, date) => {
        const taskDateObj = new Date(taskExpirationDate);
        const dateObj = new Date(date);
        return (
            taskDateObj.getFullYear() == dateObj.getFullYear() &&
            taskDateObj.getMonth() == dateObj.getMonth() &&
            taskDateObj.getDay() == dateObj.getDay()
        );
    };

    const { data, error, loading } = useAllRegisteredShortTasks()
    if (loading || error) return (<></>);

    const todayTask = data.allRegisteredShortTasks.filter((task) => {
        return isDateMatched(task.expirationDate, formatISO(Today));
    });

    todayTask.sort(function (a, b) {
        return compareReturn(a.priority, b.priority);
    });

    const obj = {
        date: Today,
        title: "Today",
        tasks: todayTask,
        sx: {
            width: "35%",
            height: "400px",
            overflow: "auto",
            backgroundColor: "white", // 背景色を指定
        },
        font_size: "21px",
        item_xs0: 7,
        item_xs1: 5,
        font_weight: "bold",
    };

    return (
        <>
            <DailyTask {...obj} />
        </>
    )
}