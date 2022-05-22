import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./util";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
	//获取所有的task
	const { data: allTasks } = useTasks(useTasksSearchParams());
	//过滤得到只属于本 column的 task
	const tasks = allTasks?.filter((task) => task.id === kanban.id);
	return (
		<div>
			<h3>{kanban.name}</h3>
			{tasks?.map((task) => (
				<div key={task.id}>{task.name}</div>
			))}
		</div>
	);
};
