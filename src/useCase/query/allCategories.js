import { ALL_CATEGORIES } from "../../schema";

export const useAllCategories = () => {
    const { data, error, loading } = useQuery(ALL_CATEGORIES);
}