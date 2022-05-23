import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Input } from "antd";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
	const [name, setName] = useState("");
	const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
	const projectId = useProjectIdInUrl();
	const [inputMode, setInputMode] = useState(false);

	const submit = async () => {
		await addTask({ projectId, name, kanbanId });
		setInputMode(false);
		setName("");
	};

	const toggle = () => setInputMode((mode) => !mode);

	useEffect(() => {
		if (!inputMode) {
			setName("");
		}
	}, [inputMode]);

	if (!inputMode) {
		return (
			<div onClick={toggle}>
				<PlusOutlined
					style={{ color: "rgb(38, 132, 255)", marginRight: "0.5rem" }}
				/>
				创建事务
			</div>
		);
	}

	return (
		<Card>
			<Input
				onBlur={toggle}
				placeholder={"需要做些什么"}
				autoFocus={true}
				onPressEnter={submit}
				value={name}
				onChange={(evt) => setName(evt.target.value)}
			/>
		</Card>
	);
};
