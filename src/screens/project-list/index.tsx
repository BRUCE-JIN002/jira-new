import React from "react";
import { SearchPanel } from "./search_panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox, Row, ScreenContainer } from "components/lib";
import { PlusCircleFilled } from "@ant-design/icons";

//基本类型，可以放到依赖组件里， 组件状可以放到依赖里，非组件状态的对象， 绝不可以放到依赖里
export const ProjectListScreen = () => {
	useDocumentTitle("项目列表", false);

	const [param, setParam] = useProjectsSearchParams();
	const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
	const { data: users } = useUser();
	const { open } = useProjectModal();

	return (
		<ScreenContainer>
			<Row between={true}>
				<h1 style={{ paddingBottom: "2rem" }}>项目列表</h1>
				<Button
					type="primary"
					style={{ backgroundColor: "rgb(38, 132, 255)", border: "none" }}
					onClick={open}
				>
					<PlusCircleFilled color="rgb(38, 132, 255)" />
					创建项目
				</Button>
			</Row>

			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<ErrorBox error={error} />
			<List loading={isLoading} users={users || []} dataSource={list || []} />
		</ScreenContainer>
	);
};

ProjectListScreen.whyDidYouRender = false;
