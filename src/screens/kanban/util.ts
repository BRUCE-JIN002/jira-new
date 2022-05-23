//通过 Url获取项目名

import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
import { useUrlQueryParam } from "utils/url";

export const useProjectIdInUrl = () => {
	const { pathname } = useLocation(); //获取当前 url路径
	const id = pathname.match(/projects\/(\d+)/)?.[1]; //使用regExp匹配得到project.id
	return Number(id); //返回装换为数字类型的 id
};

//获取当前路径里 project.id 项目详情
export const useProjectInUrl = () => useProject(useProjectIdInUrl());
//获取项目的 id参数
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
//看板的queryKey
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];
//获取task为id的参数
export const useTasksSearchParams = () => {
	const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
	const projectId = useProjectIdInUrl();
	return useMemo(
		() => ({
			projectId,
			typeId: Number(param.typeId) || undefined,
			processorId: Number(param.processorId) || undefined,
			tagId: Number(param.tagId) || undefined,
			name: param.name,
		}),
		[projectId, param]
	);
};
//task的queryKey
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

//作用：编辑任务
export const useTasksModal = () => {
	const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
		"editingTaskId",
	]);

	const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

	const startEdit = useCallback(
		(id: number) => {
			setEditingTaskId({ editingTaskId: id });
		},
		[setEditingTaskId]
	);

	const close = useCallback(() => {
		setEditingTaskId({ editingTaskId: "" });
	}, [setEditingTaskId]);

	return {
		editingTaskId,
		editingTask,
		startEdit,
		close,
		isLoading,
	};
};
