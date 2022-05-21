import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//抽象项目获取的操作
export const useProjects = (param?: Partial<Project>) => {
	const { run, ...rest } = useAsync<Project[]>();
	const client = useHttp();
	const fetchProject = useCallback(
		() => client("projects", { data: cleanObject(param || {}) }),
		[client, param]
	);

	useEffect(() => {
		run(fetchProject(), { retry: fetchProject });
	}, [param]);

	return rest;
};

//编辑项目
export const useEditProject = () => {
	const { run, ...asyncRest } = useAsync(); //触发异步请求
	const client = useHttp(); //触发http请求
	const mutate = (params: Partial<Project>) => {
		return run(
			client(`projects/${params.id}`, {
				data: params,
				method: "PATCH",
			})
		);
	};
	return { mutate, ...asyncRest };
};

//添加项目
export const useAddProject = () => {
	const { run, ...asyncRest } = useAsync(); //触发异步请求
	const client = useHttp(); //触发http请求
	const mutate = (params: Partial<Project>) => {
		return run(
			client(`projects/${params.id}`, {
				data: params,
				method: "POST",
			})
		);
	};
	return { mutate, ...asyncRest };
};
