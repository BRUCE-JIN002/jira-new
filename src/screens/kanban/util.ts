//通过 Url获取项目名

import { useLocation } from "react-router";
import { useProject } from "utils/project";

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
export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });
//task的queryKey
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
