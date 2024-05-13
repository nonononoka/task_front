import { ALL_REGISTERED_SHORT_TASKS } from "../../schema";

export const useAllRegisteredShortTasks = () => {
    const { data, error, loading } = useQuery(ALL_REGISTERED_SHORT_TASKS);
    return {data, error, loading}
}