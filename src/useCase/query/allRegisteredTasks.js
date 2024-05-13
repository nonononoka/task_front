import { ALL_TASKS } from "../../schema";

export const useAllTasks = () => {
    const { data, error, loading } = useQuery(ALL_TASKS);
    return {data, error, loading}
}