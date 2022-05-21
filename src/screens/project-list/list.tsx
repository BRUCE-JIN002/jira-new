import React from "react";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "./search_panel";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListAction } from "./project-list.slice";

//TODO id改为number类型
export interface Project {
	id: number;
	name: string;
	pin: boolean;
	personId: number;
	organization: string;
	created: number;
}

interface ListProps extends TableProps<Project> {
	users: User[];
	refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
	const { mutate } = useEditProject(); //编辑项目
	const pinProject = (id: number) => (pin: boolean) =>
		mutate({ id, pin }).then(props.refresh); //收藏项目
	const dispatch = useDispatch();

	return (
		<Table
			rowKey={"id"}
			pagination={false}
			columns={[
				{
					title: <Pin checked={true} disabled={true} />,
					render(value, project) {
						return (
							<Pin
								checked={project.pin}
								onCheckedChange={pinProject(project.id)}
							/>
						);
					},
				},
				{
					title: "名称",
					sorter: (a, b) => a.name.localeCompare(b.name),
					render(value, project) {
						return <Link to={String(project.id)}>{project.name}</Link>;
					},
				},
				{
					title: "部门",
					dataIndex: "organization",
				},
				{
					title: "负责人",
					render(value, project) {
						return (
							<span>
								{users.find((user) => user.id === project.personId)?.name}
							</span>
						);
					},
				},
				{
					title: "创建时间",
					render(value, project) {
						return (
							<span>
								{project.created
									? dayjs(project.created).format("YYYY-MM-DD")
									: "无"}
							</span>
						);
					},
				},
				{
					title: "更多操作",
					render(value, project) {
						return (
							<Dropdown
								overlay={
									<Menu>
										<Menu.Item key={"edit"}>
											<ButtonNoPadding
												type={"link"}
												onClick={() =>
													dispatch(projectListAction.openProjectModal())
												}
											>
												编辑
											</ButtonNoPadding>
										</Menu.Item>{" "}
										<Menu.Item key={"delete"}>
											<ButtonNoPadding type={"link"}>删除</ButtonNoPadding>
										</Menu.Item>
									</Menu>
								}
							>
								<ButtonNoPadding style={{ paddingLeft: "2rem" }} type={"link"}>
									...
								</ButtonNoPadding>
							</Dropdown>
						);
					},
				},
			]}
			{...props}
		/>
	);
};
