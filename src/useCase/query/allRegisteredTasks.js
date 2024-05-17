import { ALL_TASKS } from "../../schema";
import { useQuery } from "@apollo/client";

export const useAllTasks = () => {
    const { data, error, loading } = useQuery(ALL_TASKS);
    return {data, error, loading}
}