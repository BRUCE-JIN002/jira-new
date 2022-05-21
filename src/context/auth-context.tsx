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

export const bootstrapUser = async () => {
	let user = null;
	const token = auth.getToken();
	if (token) {
		const data = await http("me", { token });
		user = data.user;
	}
	return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
	const dispatch: (...args: any[]) => Promise<User> = useDispatch();

	useMount(() => {
		run(dispatch(bootstrap()));
	});

	if (isIdle || isLoading) {
		return <FullPageLoading />;
	}

	if (isError) {
		return <FullPageErrorFallback error={error} />;
	}

	return <div>{children}</div>;
};

export const useAuth = () => {
	const dispatch: (...args: any[]) => Promise<User> = useDispatch();
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
