import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "strore";

interface State {
	projectModalOpen: boolean;
}

//默认状态
const initialState: State = {
	projectModalOpen: false,
};
//项目列表切片
export const projectListSlice = createSlice({
	name: "projectListSlice", //标识 slice本身, 没多大实际作用
	initialState,
	reducers: {
		openProjectModal(state) {
			state.projectModalOpen = true;
		},
		closeProjectModal(state) {
			state.projectModalOpen = false;
		},
	},
});

export const projectListAction = projectListSlice.actions;

//抽象获取store里projectList里模态框的打开状态
export const selectProjctModalOpen = (state: RootState) =>
	state.projectList.projectModalOpen;
