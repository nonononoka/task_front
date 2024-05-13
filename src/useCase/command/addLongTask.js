import { ADD_TASK_MUTATION } from "../../schema";

export const useAddLongTask = () => {
    const [addLongTask, { loading, error }] = useMutation(ADD_TASK_MUTATION, {
        refetchQueries: [{ query: ALL_TASKS }, { query: ALL_CATEGORIES }],
    });

    return { addLongTask, loading, error }
}
