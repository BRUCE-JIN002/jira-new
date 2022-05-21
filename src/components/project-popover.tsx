import React from "react";
import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";

export const ProjectPopover = () => {
	//获取项目列表数据
	const { data: projects } = useProjects();
	const pinnedProjects = projects?.filter((project) => project.pin); //取得收藏项目
	const { open } = useProjectModal();

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
			<Button
				type="primary"
				style={{ backgroundColor: "rgb(38, 132, 255)", border: "none" }}
				onClick={open}
			>
				创建项目
			</Button>
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
