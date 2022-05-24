import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useReorderKanbanConfig } from "./use-optimistic-option";

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

export interface SortProps {
	//要重新排序的 item
	fromId: number;
	//目标 item
	referenceId: number;
	//放在目标 item的前还是后
	type: "before" | "after";
	fromKanbanId?: number;
	toKanbanId?: number;
}
//看板排序
export const useReorderKanban = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation((params: SortProps) => {
		return client("kanbans/reorder", {
			data: params,
			method: "POST",
		});
	}, useReorderKanbanConfig(queryKey));
};
