import { useEffect, useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

//项目列表搜索的参数
export const useProjectsSearchParams = () => {
	const [param, setParam] = useUrlQueryParam(["name", "personId"]);
	return [
		useMemo(
			() => ({
				...param,
				personId: Number(param.personId) || undefined,
			}),
			[param]
		),
		setParam,
	] as const;
};

//使用 url 管理 projectModal的状态: 扮演状态管理器的功能
export const useProjectModal = () => {
	//读取键 "projectCreate" 的状态(参数)
	const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
		"projectCreate",
	]);

	//获取编辑的状态(参数)
	const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
		"editingProjectId",
	]);
	//设置url状态的函数
	const setUrlParams = useSetUrlSearchParam();
	//获取所需要编辑的项目
	const { data: editingProject, isLoading } = useProject(
		Number(editingProjectId)
	);

	const open = () => setProjectCreate({ projectCreate: true });
	const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
	const startEdit = (id: number) =>
		setEditingProjectId({ editingProjectId: id });

	return {
		projectModalOpen: projectCreate === "true" || Boolean(editingProject),
		open,
		close,
		startEdit,
		editingProject,
		isLoading,
	};
};
