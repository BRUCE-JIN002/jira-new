import React from "react";
import { SearchPanel } from "./search_panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectsSearchParams } from "./util";

//基本类型，可以放到依赖组件里， 组件状可以放到依赖里，非组件状态的对象， 绝不可以放到依赖里
export const ProjectListScreen = () => {
	useDocumentTitle("项目列表", false);

	const [param, setParam] = useProjectsSearchParams();
	const {
		isLoading,
		error,
		data: list,
		retry,
	} = useProjects(useDebounce(param, 200));
	const { data: users } = useUser();

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			{error ? (
				<Typography.Text type={"danger"}>{error.message}</Typography.Text>
			) : null}
			<List
				refresh={retry}
				loading={isLoading}
				users={users || []}
				dataSource={list || []}
			/>
		</Container>
	);
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
	padding: 3.2rem;
`;
