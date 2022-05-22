import { useEffect, useState } from "react";
import React from "react";
import { Form, Input, Select } from "antd";
import { Project } from "../../types/project";
import { UserSelect } from "components/user-select";
import { User } from "../../types/user";

interface SearchPanelProps {
	users: User[];
	param: Partial<Pick<Project, "name" | "personId">>;
	setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
	return (
		<Form layout="inline" style={{ marginBottom: "2rem" }}>
			<Form.Item>
				<Input
					placeholder={"项目名"}
					type={"text"}
					value={param.name}
					onChange={(evt) => setParam({ ...param, name: evt.target.value })}
				/>
			</Form.Item>
			<Form.Item>
				<UserSelect
					defaultOptionName={"负责人"}
					value={param.personId}
					onChange={(value) =>
						setParam({
							...param,
							personId: value,
						})
					}
				/>
			</Form.Item>
		</Form>
	);
};
