import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
	data?: object;
	token?: string;
}

export const http = async (
	endpoint: string,
	{ data, token, headers, ...customConfig }: Config = {}
) => {
	//请求配置
	const config = {
		method: "GET",
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
			"Content-Type": data ? "application/json" : "",
		},
		...customConfig,
	};
	//处理不同类型请求
	if (config.method.toUpperCase() === "GET") {
		endpoint += `?${qs.stringify(data)}`;
	} else {
		config.body = JSON.stringify(data);
	}
	//开始请求
	// axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
	return window
		.fetch(`${apiUrl}/${endpoint}`, config)
		.then(async (response) => {
			if (response.status === 401) {
				auth.logout();
				window.location.reload();
				return Promise.reject({ message: "请重新登录" });
			}
			const data = await response.json();
			if (response.ok) {
				return data;
			} else {
				return Promise.reject(data);
			}
		});
};

//自动携带token的请求， 在Http的基础上
export const useHttp = () => {
	//随时获取用户数据
	const { user } = useAuth();
	return (...[endpoint, config]: Parameters<typeof http>) =>
		http(endpoint, { ...config, token: user?.token });
};
