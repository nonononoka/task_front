import { ALL_CATEGORIES } from "../../schema";
import { useQuery } from "@apollo/client";

export const useAllCategories = () => {
    const { data, error, loading } = useQuery(ALL_CATEGORIES);
    return { data, error, loading }
}