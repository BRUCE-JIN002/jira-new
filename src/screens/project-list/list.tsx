import React from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "./search_panel";
import { Link } from "react-router-dom";

//TODO id改为number类型
export interface Project {
	id: string;
	name: string;
	pin: string;
	personId: string;
	organization: string;
	created: number;
}

interface ListProps extends TableProps<Project> {
	users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
	return (
		<Table
			rowKey={"id"}
			pagination={false}
			columns={[
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
									? dayjs(project.created).format("YYYY-MM_DD")
									: "无"}
							</span>
						);
					},
				},
			]}
			{...props}
		/>
	);
};
