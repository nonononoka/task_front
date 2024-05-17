import { CHANGE_IS_COMPLETED } from "../../schema";
import { ALL_REGISTERED_SHORT_TASKS } from "../../schema";
import { useMutation } from "@apollo/client";

export const useChangeIsCompleted = () => {
    const [changeIsCompleted] = useMutation(CHANGE_IS_COMPLETED, {
        refetchQueries: [{ query: ALL_REGISTERED_SHORT_TASKS }],
    });

    return changeIsCompleted
}