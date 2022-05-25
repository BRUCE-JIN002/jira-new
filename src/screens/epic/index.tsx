import React, { useState } from "react";
import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./utils";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { Epic } from "types/epic";
import { PlusOutlined } from "@ant-design/icons";

export const EpicScreen = () => {
	//获取当前项目project
	const { data: currentProject } = useProjectInUrl();
	//获取当前项目project的 epics
	const { data: epics } = useEpics(useEpicSearchParams());
	//属于currentProject 的所有 task
	const { data: tasks } = useTasks({ projectId: currentProject?.id });
	//删除epic
	const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
	//控制epic的创建框的开合
	const [epicCreateOpen, setEipcCreateOpen] = useState(false);

	const confirmDeleteEpic = (epic: Epic) => {
		Modal.confirm({
			title: `确定删除项目组：${epic.name}`,
			content: "点击确定删除",
			okText: "确定",
			onOk() {
				deleteEpic({ id: epic.id });
			},
		});
	};

	return (
		<ScreenContainer>
			<Row between={true}>
				<h1>{currentProject?.name}任务组</h1>
				<Button
					type={"primary"}
					style={{ backgroundColor: "rgb(38, 132, 255)", border: "none" }}
					onClick={() => setEipcCreateOpen(true)}
				>
					<PlusOutlined />
					新建任务组
				</Button>
			</Row>
			<List
				style={{ overflowY: "scroll" }}
				dataSource={epics}
				itemLayout={"vertical"}
				renderItem={(epic) => (
					<List.Item key={epic.id}>
						<List.Item.Meta
							title={
								<Row between={true}>
									<span>{epic.name}</span>
									<Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
										删除
									</Button>
								</Row>
							}
							description={
								<div>
									<div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")} </div>
									<div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")} </div>
								</div>
							}
						/>
						<div>
							{tasks
								?.filter((task) => task.epicId === epic.id)
								.map((task) => (
									<div key={task.id}>
										<Link
											to={`projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
											replace={true}
										>
											{task.name}
										</Link>
									</div>
								))}
						</div>
					</List.Item>
				)}
			/>
			<CreateEpic
				onClose={() => setEipcCreateOpen(false)}
				visible={epicCreateOpen}
			/>
		</ScreenContainer>
	);
};
