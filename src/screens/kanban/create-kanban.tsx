import { Input } from "antd";
import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanban-column";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
	const [name, setName] = useState("");
	const projectId = useProjectIdInUrl();
	const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

	const subimt = async () => {
		await addKanban({ name, projectId });
		setName("");
	};

	return (
		<Container>
			<Input
				size={"large"}
				placeholder={"新建看板名称"}
				onPressEnter={subimt}
				value={name}
				onChange={(evt) => setName(evt.target.value)}
			/>
		</Container>
	);
};