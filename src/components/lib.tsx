import React from "react";
import styled from "@emotion/styled";
import { Button, Result, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import { restRoute } from "utils";

//实现自动转换单位的行组件
export const Row = styled.div<{
	gap?: number | boolean;
	between?: boolean;
	marginBottom?: number;
}>`
	display: flex;
	align-items: center;
	justify-content: ${(props) => (props.between ? "space-between" : undefined)};
	margin-bottom: ${(props) => props.marginBottom + "rem"};
	> * {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		margin-right: ${(props) =>
			typeof props.gap === "number"
				? props.gap + "rem"
				: props.gap
				? "2rem"
				: undefined};
	}
`;

//全局样式组件
const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

//全局的加载时的转菊花
export const FullPageLoading = () => {
	return (
		<FullPage>
			<Spin size="large" />
		</FullPage>
	);
};

//全局的错误信息展示
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
	return (
		<FullPage>
			<DevTools />
			<ErrorBox error={error} />
		</FullPage>
	);
};

//全局404页面显示
export const FullPageNotFound = () => {
	return (
		<FullPage>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button
						type="primary"
						style={{ backgroundColor: "rgb(38, 132, 255)", border: "none" }}
						onClick={restRoute}
					>
						Back Home
					</Button>
				}
			/>
		</FullPage>
	);
};
//随机生成用户头像
export const Avatar = () => {
	return (
		<span style={{ marginRight: 5 }}>
			<img
				src="https://joeschmoe.io/api/v1/random"
				style={{
					display: "inline-block",
					width: "25px",
					height: "25px",
					borderRadius: "50%",
					marginRight: "3px",
				}}
			/>
		</span>
	);
};

//类型守卫: 有信息时才返回
const isError = (value: any): value is Error => value?.message;

//ErrorBox 可以接受任意类型，只有当为真正的 Error 类型时，才显示 error.message
export const ErrorBox = ({ error }: { error: unknown }) => {
	if (isError(error)) {
		return <Typography.Text type="danger">{error?.message}</Typography.Text>;
	}
	return null;
};

export const ButtonNoPadding = styled(Button)`
	padding: 0;
`;
