import React from "react";
import styled from "@emotion/styled";
import { Avatar, FullPageNotFound, Row } from "components/lib";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
//以组件的方式引入logo
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import {
	Routes,
	Route,
	BrowserRouter as Router,
	Navigate,
} from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { restRoute } from "utils";

export const AuthenticatedApp = () => {
	return (
		<Container>
			<PageHeader />
			<Main>
				<Router>
					<Routes>
						<Route index element={<Navigate to="/projects" replace={true} />} />
						<Route path={"/projects"} element={<ProjectListScreen />} />
						<Route
							path={"/projects/:projectId/*"}
							element={<ProjectScreen />}
						/>
						<Route path="*" element={<FullPageNotFound />} />
					</Routes>
				</Router>
			</Main>
		</Container>
	);
};

const PageHeader = () => {
	const { logout, user } = useAuth();
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<Button type="link" onClick={restRoute}>
					<SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
				</Button>
				<h2>项目</h2>
				<h2>用户</h2>
			</HeaderLeft>
			<HeaderRight>
				<Avatar />
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item key={"logout"}>
								<Button type="link" onClick={logout}>
									登出
								</Button>
							</Menu.Item>
						</Menu>
					}
				>
					<a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
				</Dropdown>
			</HeaderRight>
		</Header>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr;
	height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
	padding: 3.2rem;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
	z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
