import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search_panel";
import * as auth from "auth-provider";
import { AuthForm, bootstrapUser } from "context/auth-context";
import { AppDispatch, RootState } from "strore";

interface State {
	user: User | null;
}

const initialState: State = {
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

const { setUser } = authSlice.actions;

//获取 user
export const selectUser = (state: RootState) => state.auth.user;

//4个thunk的异步管理
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
	auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: AuthForm) => (disptch: AppDispatch) =>
	auth.register(form).then((user) => disptch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) =>
	auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AppDispatch) =>
	bootstrapUser().then((user) => dispatch(setUser(user)));
