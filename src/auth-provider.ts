//在真实环境中， 如果使用firebase这种第三方auth服务的话， 本文件不需要开发者开发

import { User } from "./screens/project-list/search_panel";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user?.token || "");
	return user;
};
const apiUrl = process.env.REACT_APP_API_URL;

//登录请求
export const login = async (data: { username: string; password: string }) => {
	const response = await fetch(`${apiUrl}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		return handleUserResponse(await response.json());
	} else {
		return Promise.reject(data);
	}
};

//注册请求
export const register = async (data: {
	username: string;
	password: string;
}) => {
	const response = await fetch(`${apiUrl}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		return handleUserResponse(await response.json());
	} else {
		return Promise.reject(data);
	}
};

//登出请求
export const logout = async () =>
	window.localStorage.removeItem(localStorageKey);
