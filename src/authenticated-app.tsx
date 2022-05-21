import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, ButtonNoPadding, FullPageNotFound, Row } from "components/lib";
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
import { ProjectModalOpen } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

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
			<ProjectModalOpen />
		</Container>
	);
};

//页眉模块
const PageHeader = () => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<ButtonNoPadding type="link" onClick={restRoute}>
					<SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
				</ButtonNoPadding>
				<ProjectPopover />
				<span>用户</span>
			</HeaderLeft>
			<HeaderRight>
				<User />
			</HeaderRight>
		</Header>
	);
};

//用户信息模块
const User = () => {
	const { logout, user } = useAuth();
	return (
		<Fragment>
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
		</Fragment>
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