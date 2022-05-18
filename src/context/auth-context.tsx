import React, { ReactNode, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search_panel";
import { useMount } from "../utils";
import { http } from "../utils/http";

interface AuthForm {
	username: string;
	password: string;
}

const bootsrtapUser = async () => {
	let user = null;
	const token = auth.getToken();
	if (token) {
		const data = await http("me", { token });
		user = data.user;
	}
	return user;
};

const AuthContext = React.createContext<
	| {
			user: User | null;
			login: (form: AuthForm) => Promise<void>;
			register: (form: AuthForm) => Promise<void>;
			logout: () => Promise<void>;
	  }
	| undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	//登录
	const login = (form: AuthForm) =>
		auth.login(form).then((user) => setUser(user));

	//注册
	const register = (form: AuthForm) =>
		auth.register(form).then((user) => setUser(user));

	//登出
	const logout = () => auth.logout().then(() => setUser(null));
	//页面加载后调用一次
	useMount(() => {
		bootsrtapUser().then(setUser);
	});

	//返回出来
	return (
		<AuthContext.Provider
			children={children}
			value={{ user, login, register, logout }}
		/>
	);
};

//自定义hook
export const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth必须在AuthProvider中使用");
	}
	return context;
};
