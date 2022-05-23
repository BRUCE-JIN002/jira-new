import { useQuery } from "react-query";
import { TaskType } from "types/task";
import { useHttp } from "./http";

//获取 task 所有的类型存在列表里
export const useTaskTypes = () => {
	const client = useHttp();

	return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
