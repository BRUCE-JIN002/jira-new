import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-option";

//获取看板列表
export const useKanbans = (param?: Partial<Kanban>) => {
	const client = useHttp();

	return useQuery<Kanban[]>(["kanbans", param], () =>
		client("kanbans", { data: param })
	);
};

//添加看板：
export const useAddKanban = (queryKey: QueryKey) => {
	const client = useHttp(); //触发http请求
	return useMutation(
		(params: Partial<Kanban>) =>
			client(`kanbans`, {
				method: "POST",
				data: params,
			}),
		useAddConfig(queryKey) //乐观更新的配置项
	);
};

//删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
	const client = useHttp(); //触发http请求
	return useMutation(
		({ id }: { id: number }) =>
			client(`kanbans/${id}`, {
				method: "DELETE",
			}),
		useAddConfig(queryKey) //乐观更新的配置项
	);
};
