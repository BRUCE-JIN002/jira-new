import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useDebounce } from "utils";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import {
	useAddConfig,
	useDeleteConfig,
	useEditConfig,
	useReorderTaskConfig,
} from "./use-optimistic-option";

//获取看板 task
export const useTasks = (param?: Partial<Task>) => {
	const client = useHttp();
	const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };

	return useQuery<Task[]>(["tasks", debouncedParam], () =>
		client("tasks", { data: debouncedParam })
	);
};

//添加 task
export const useAddTask = (queryKey: QueryKey) => {
	const client = useHttp();

	return useMutation(
		(params: Partial<Task>) =>
			client(`tasks`, {
				data: params,
				method: "POST",
			}),
		useAddConfig(queryKey)
	);
};

//获取任务详情
export const useTask = (id?: number) => {
	const client = useHttp();

	return useQuery<Task>(["tasks", { id }], () => client(`tasks/${id}`), {
		enabled: Boolean(id), //id不为空时才触发获取详情的请求
	});
};

//编辑任务(task)
export const useEditTask = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(params: Partial<Task>) =>
			client(`tasks/${params.id}`, {
				method: "PATCH",
				data: params,
			}),
		useEditConfig(queryKey)
	);
};

//删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
	const client = useHttp(); //触发http请求

	return useMutation(
		({ id }: { id: number }) =>
			client(`tasks/${id}`, {
				method: "DELETE",
			}),
		useDeleteConfig(queryKey) //乐观更新的配置项
	);
};

//任务排序
export const useReorderTask = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation((params: SortProps) => {
		return client("tasks/reorder", {
			data: params,
			method: "POST",
		});
	}, useReorderTaskConfig(queryKey));
};
