import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTasksModal, useTasksQueryKey } from "./util";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

export const TaskModal = () => {
	const [form] = useForm();

	//获取task的操作方法和状态
	const { editingTask, editingTaskId, close } = useTasksModal();
	const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
		useTasksQueryKey()
	);
	const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

	//取消编辑时
	const onCancel = () => {
		close(); //关闭编辑框
		form.resetFields(); //重置表单
	};

	//编辑完成时
	const onOk = async () => {
		await editTask({ ...editingTask, ...form.getFieldsValue() });
		close();
	};

	const startDelete = () => {
		close();
		Modal.confirm({
			okText: "确定",
			cancelText: "取消",
			title: "确定删除任务吗？",
			onOk() {
				return deleteTask({ id: Number(editingTaskId) });
			},
		});
	};
	useEffect(() => {
		form.setFieldsValue(editingTask);
	}, [form, editingTask]);

	return (
		<Modal
			okText={"确认"}
			cancelText={"取消"}
			title={"编辑任务"}
			visible={!!editingTaskId}
			confirmLoading={editLoading}
			onCancel={onCancel}
			onOk={onOk}
			forceRender={true}
		>
			<Form {...layout} initialValues={editingTask} form={form}>
				<Form.Item
					label={"任务名"}
					name={"name"}
					rules={[{ required: true, message: "请输入任务名" }]}
				>
					<Input placeholder={"任务名"} />
				</Form.Item>
				<Form.Item label={"经办人"} name={"processorId"}>
					<UserSelect defaultOptionName={"经办人"} />
				</Form.Item>
				<Form.Item label={"类型"} name={"typeId"}>
					<TaskTypeSelect />
				</Form.Item>
			</Form>
			<div style={{ textAlign: "right" }}>
				<Button
					style={{ fontSize: "14px" }}
					size={"small"}
					onClick={startDelete}
				>
					删除
				</Button>
			</div>
		</Modal>
	);
};
