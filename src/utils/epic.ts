import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-option";

//获取epic任务组列表
export const useEpics = (param?: Partial<Epic>) => {
	const client = useHttp();

	return useQuery<Epic[]>(["epics", param], () =>
		client("epics", { data: param })
	);
};

//添加epic任务组：
export const useAddEpic = (queryKey: QueryKey) => {
	const client = useHttp(); //触发http请求

	return useMutation(
		(params: Partial<Epic>) =>
			client(`epics`, {
				method: "POST",
				data: params,
			}),
		useAddConfig(queryKey) //乐观更新的配置项
	);
};

//删除epic任务组
export const useDeleteEpic = (queryKey: QueryKey) => {
	const client = useHttp(); //触发http请求

	return useMutation(
		({ id }: { id: number }) =>
			client(`epics/${id}`, {
				method: "DELETE",
			}),
		useDeleteConfig(queryKey) //乐观更新的配置项
	);
};
