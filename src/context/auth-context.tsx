import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode, useCallback, useState } from "react";
import { useAsync } from "utils/use-async";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search_panel";
import { useMount } from "../utils";
import { http } from "../utils/http";
import * as authStore from "strore/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap, selectUser } from "strore/auth.slice";

export interface AuthForm {
	username: string;
	password: string;
}

export const bootsrtapUser = async () => {
	let user = null;
	const token = auth.getToken();
	if (token) {
		const data = await http("me", { token });
		user = data.user;
	}
	return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const {
		data: user,
		error,
		isLoading,
		isIdle,
		isError,
		run,
	} = useAsync<User | null>();

	const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

	//页面加载后调用一次
	useMount(
		useCallback(() => {
			run(dispatch(bootstrap()));
		}, [])
	);
	if (isIdle || isLoading) {
		return <FullPageLoading />;
	}

	if (isError) {
		return <FullPageErrorFallback error={error} />;
	}

	//返回出来
	return <div>{children}</div>;
};

//自定义hook
export const useAuth = () => {
	const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
	const user = useSelector(selectUser);
	const login = useCallback(
		(form: AuthForm) => dispatch(authStore.login(form)),
		[dispatch]
	);
	const register = useCallback(
		(form: AuthForm) => dispatch(authStore.register(form)),
		[dispatch]
	);
	const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
	return {
		user,
		login,
		register,
		logout,
	};
};
