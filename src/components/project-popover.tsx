import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
	//获取项目列表数据
	const { data: projects, isLoading } = useProjects();
	const pinnedProjects = projects?.filter((project) => project.pin); //取得收藏项目

	const content = (
		<ContentContainer>
			<Typography.Text type={"secondary"}>收藏项目</Typography.Text>
			<List>
				{pinnedProjects?.map((project) => (
					<List.Item key={project.id}>
						<List.Item.Meta title={project.name} />
					</List.Item>
				))}
			</List>
			<Divider />
			{props.projectButton}
		</ContentContainer>
	);

	return (
		<Popover placement={"bottom"} content={content}>
			项目
		</Popover>
	);
};

const ContentContainer = styled.div`
	min-width: 30rem;
`;
