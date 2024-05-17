import { REMOVE_EACH_TASK_MUTATION } from "../../schema";
import { ALL_REGISTERED_SHORT_TASKS } from "../../schema";
import { useMutation } from "@apollo/client";

export const useRemoveTask = () => {
    const [removeTask] = useMutation(REMOVE_EACH_TASK_MUTATION, {
        refetchQueries: [{ query: ALL_REGISTERED_SHORT_TASKS }],
    });

    return removeTask
}