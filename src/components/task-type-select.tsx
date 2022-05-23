import React from "react";
import { useTaskTypes } from "utils/task-type";
import { IdSelect } from "./id-select";

//带类型处理的用户选择组件
export const TaskTypeSelect = (
	props: React.ComponentProps<typeof IdSelect>
) => {
	const { data: taskTypes } = useTaskTypes();
	return <IdSelect options={taskTypes || []} {...props} />;
};
