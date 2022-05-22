import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
	useDocumentTitle("看板列表");

	//获取当前项目的所有数据
	const { data: currentProject } = useProjectInUrl();

	//获取看板数据
	const { data: kanbans } = useKanbans(useKanbanSearchParams());
	return (
		<div>
			<h1>{currentProject?.name}看板</h1>;
			<ColumnContainer>
				{kanbans?.map((kanban) => (
					<KanbanColumn key={kanban.id} kanban={kanban} />
				))}
			</ColumnContainer>
		</div>
	);
};

const ColumnContainer = styled.div`
	display: flex;
	overflow: hidden;
	margin-right: "2rem";
`;
