import { useAddShortTask } from "../../../useCase/command/addShortTask";
import { useAddTask } from "../../../useCase/command/addTask";
import { useAllTasks } from "../../../useCase/query/allRegisteredTasks";
import { useAllCategories } from "../../../useCase/query/allCategories";
import { AddTaskModal } from "../domain/objects";

export const AddTaskModalContainer = ({ onClose, isTemporary, temporaryDate }) => {
    const { data: categories, error, loading } = useAllCategories()
    const { data: registeredTaskData, error: taskError, loading: taskLoading } = useAllTasks()

    const { addShortTask, loading: addShortTaskloading, error: addShortTaskError } = useAddShortTask()
    const { addLongTask, loading: addTaskLoading, error: addTaskError } = useAddLongTask()
    const addTask = isTemporary ? addShortTask : addLongTask
    if (error || loading) {
        return <></>;
    }
    if (taskError || taskLoading) {
        return <></>;
    }

    return (
        <AddTaskModal onClose={onClose} isTemporary={isTemporary} temporaryDate={temporaryDate} categories={categories} registeredTaskData={registeredTaskData} addTask={addTask} />
    );
};