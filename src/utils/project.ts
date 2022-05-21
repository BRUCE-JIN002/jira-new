import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//抽象项目获取的操作
export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp();

	//["projects", param] 里当 param 的值变化的时候就重新请求一遍
	return useQuery<Project[]>(["projects", param], () =>
		client("projects", { data: param })
	);
};

//编辑项目
export const useEditProject = () => {
	const client = useHttp();
	const queryClient = useQueryClient();
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects/${params.id}`, {
				method: "PATCH",
				data: params,
			}),
		{
			onSuccess: () => queryClient.invalidateQueries("projects"),
		}
	);
};

//添加项目： 使用useMutation改写
export const useAddProject = () => {
	const client = useHttp(); //触发http请求
	const queryClient = useQueryClient();

	return useMutation(
		(params: Partial<Project>) =>
			client(`projects`, {
				method: "POST",
				data: params,
			}),
		{
			//成功时刷新数据
			onSuccess: () => queryClient.invalidateQueries("projects"),
		}
	);
};

//获取项目详情
export const useProject = (id: number) => {
	const client = useHttp();
	return useQuery(["project", { id }], () => client(`projects/${id}`), {
		enabled: Boolean(id), //id不为空时才触发获取详情的请求
	});
};
