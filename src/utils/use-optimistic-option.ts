import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

//乐观更新的配置
export const useConfig = (
	queryKey: QueryKey,
	callback: (target: any, old?: any[]) => any[]
) => {
	const queryClient = useQueryClient();
	return {
		onSuccess: () => queryClient.invalidateQueries(queryKey),
		//实现乐观更新，在一改变时就触发 onMutate
		async onMutate(target: any) {
			const previousItems = queryClient.getQueryData(queryKey); //获取更新前的状态
			//更新操作
			queryClient.setQueryData(queryKey, (old?: any[]) => {
				return callback(target, old);
			});
			return { previousItems }; //用来处理回滚
		},
		//出错时回滚数据
		onError(error: any, newItem: any, context: any) {
			queryClient.setQueryData(queryKey, context.previousItems);
		},
	};
};

//删除时乐观更新的配置
export const useDeleteConfig = (queryKey: QueryKey) =>
	useConfig(
		queryKey,
		(target, old) => old?.filter((item) => item.id !== target.id) || []
	);

//编辑时乐观更新的配置
export const useEditConfig = (queryKey: QueryKey) =>
	useConfig(
		queryKey,
		(target, old) =>
			old?.map((item) =>
				item.id === target.id ? { ...item, ...target } : item
			) || []
	);

//添加时乐观更新的配置
export const useAddConfig = (queryKey: QueryKey) =>
	useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

//看板排序配置
export const useReorderKanbanConfig = (queryKey: QueryKey) =>
	useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

//任务排序配置
export const useReorderTaskConfig = (queryKey: QueryKey) =>
	useConfig(queryKey, (target, old) => {
		const orderedList = reorder({ list: old, ...target }) as Task[];
		return orderedList.map((item) =>
			item.id === target.fromId
				? { ...item, kanbanId: target.toKanbanId }
				: item
		);
	});
