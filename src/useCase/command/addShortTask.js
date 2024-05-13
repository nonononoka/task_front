import { ADD_SHORT_TASK_MUTATION } from "../../schema";

export const useAddShortTask = () => {
    const [addShortTask, { loading, error }] = useMutation(ADD_SHORT_TASK_MUTATION, {
        refetchQueries: [
            { query: ALL_REGISTERED_SHORT_TASKS },
            { query: ALL_CATEGORIES },
        ],
    });

    return {addShortTask, loading, error}
}