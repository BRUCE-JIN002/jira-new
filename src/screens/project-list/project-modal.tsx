import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListAction, selectProjctModalOpen } from "./project-list.slice";

export const ProjectModalOpen = () => {
	//action分发
	const dispatch = useDispatch();
	//读取根状态树中模态框的状态
	const projectModalOpen = useSelector(selectProjctModalOpen);

	return (
		<Drawer
			title={"Project Modal"}
			visible={projectModalOpen}
			width={"100%"}
			onClose={() => dispatch(projectListAction.closeProjectModal())}
		>
			<Button onClick={() => dispatch(projectListAction.closeProjectModal())}>
				关闭
			</Button>
		</Drawer>
	);
};
