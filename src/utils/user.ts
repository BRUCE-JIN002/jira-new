import { useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";

//抽象获取所有用户的操作
export const useUser = (param?: Partial<User>) => {
	const client = useHttp();

	//["users", param] 里当 param 的值变化的时候就重新请求一遍
	return useQuery<User[]>(["users", param], () =>
		client("users", { data: param })
	);
};
