import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
	const { projectModalOpen, close, editingProject, isLoading } =
		useProjectModal();
	//取得编辑还是添加的状态
	const title = editingProject ? "编辑项目" : "创建项目";
	const useMutateProject = editingProject ? useEditProject : useAddProject;
	//处理提交的函数
	const {
		mutateAsync,
		error,
		isLoading: mutateLoading,
	} = useMutateProject(useProjectsQueryKey());
	const [form] = useForm(); //刷新表单的作用
	const onFinish = (values: any) => {
		mutateAsync({ ...editingProject, ...values }).then(() => {
			form.resetFields();
			close();
		});
	};

	//清空模态框里的存在的数据
	const closeModal = () => {
		form.resetFields();
		close();
	};

	//重置表单
	useEffect(() => {
		form.setFieldsValue(editingProject);
	}, [form, editingProject]);

	return (
		<Drawer
			forceRender={true}
			visible={projectModalOpen}
			width={"100%"}
			onClose={closeModal}
		>
			<Container>
				{isLoading ? (
					<Spin size={"large"} />
				) : (
					<>
						<h1>{title}</h1>
						<ErrorBox error={error} />
						<Form
							form={form}
							layout={"vertical"}
							style={{ width: "40rem" }}
							onFinish={onFinish}
						>
							<Form.Item
								label={"名称"}
								name={"name"}
								rules={[{ required: true, message: "请输入项目名" }]}
							>
								<Input placeholder={"请输入项目名称"} />
							</Form.Item>
							<Form.Item
								label={"部门"}
								name={"organization"}
								rules={[{ required: true, message: "请输入部门名" }]}
							>
								<Input placeholder={"请输入项部门"} />
							</Form.Item>
							<Form.Item label={"负责人"} name={"personId"}>
								<UserSelect defaultOptionName={"负责人"} />
							</Form.Item>
							<Form.Item style={{ textAlign: "center" }}>
								<Button
									loading={mutateLoading}
									type={"primary"}
									htmlType={"submit"}
									style={{
										backgroundColor: "rgb(38, 132, 255)",
										border: "none",
									}}
								>
									提交
								</Button>
							</Form.Item>
						</Form>
					</>
				)}
			</Container>
		</Drawer>
	);
};

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
