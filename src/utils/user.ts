import { useEffect } from "react";
import { User } from "screens/project-list/search_panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//抽象获取用户信息的操作
export const useUser = (param?: Partial<User>) => {
	const { run, ...rest } = useAsync<User[]>();
	const client = useHttp();

	useEffect(() => {
		run(client("users", { data: cleanObject(param || {}) }));
	}, [param]);

	return rest;
};
