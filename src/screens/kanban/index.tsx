import React from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import {
	useKanbanSearchParams,
	useProjectInUrl,
	useTasksSearchParams,
} from "./util";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = () => {
	useDocumentTitle("看板列表");
	//获取当前项目的所有数据
	const { data: currentProject } = useProjectInUrl();
	//获取看板数据
	const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
		useKanbanSearchParams()
	);
	//获取 task加载状态
	const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
	//正真的loading
	const isLoading = kanbanIsLoading || taskIsLoading;

	return (
		<ScreenContainer>
			<h1>{currentProject?.name}看板</h1>
			<SearchPanel />
			{isLoading ? (
				<Spin size={"large"} />
			) : (
				<ColumnsContainer>
					{kanbans?.map((kanban) => (
						<KanbanColumn key={kanban.id} kanban={kanban} />
					))}
					<CreateKanban />
				</ColumnsContainer>
			)}
			<TaskModal />
		</ScreenContainer>
	);
};

export const ColumnsContainer = styled.div`
	display: flex;
	overflow-x: scroll;
	flex: 1;
`;
