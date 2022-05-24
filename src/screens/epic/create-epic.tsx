import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useProjectIdInUrl } from "screens/kanban/util";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./utils";

export const CreateEpic = (
	props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
	const {
		mutateAsync: addEpic,
		isLoading,
		error,
	} = useAddEpic(useEpicsQueryKey());

	const [form] = useForm();
	const projectId = useProjectIdInUrl();

	const onFinish = async (values: any) => {
		await addEpic({ ...values, projectId });
		props.onClose();
	};

	useEffect(() => {
		form.resetFields();
	}, [form, props.visible]);

	return (
		<Drawer
			visible={props.visible}
			onClose={props.onClose}
			forceRender={true}
			destroyOnClose={true}
			width={"100%"}
		>
			<Container>
				{isLoading ? (
					<Spin size={"large"} />
				) : (
					<>
						<h1>创建任务组</h1>
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
								rules={[{ required: true, message: "请输入任务组名" }]}
							>
								<Input placeholder={"请输入任务组名称"} />
							</Form.Item>
							<Form.Item style={{ textAlign: "center" }}>
								<Button
									loading={isLoading}
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
