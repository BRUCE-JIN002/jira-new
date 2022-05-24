import React, { useState } from "react";
import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useUser } from "utils/user";

export const UserPopover = () => {
	//获取项目列表数据
	const { data: users, refetch } = useUser();

	const content = (
		<ContentContainer>
			<Typography.Text type={"secondary"} style={{ fontSize: "20px" }}>
				组员列表
			</Typography.Text>
			<Divider />
			<List>
				{users?.map((user) => (
					<List.Item key={user.id}>
						<List.Item.Meta title={user.name} />
					</List.Item>
				))}
			</List>
		</ContentContainer>
	);

	return (
		<Popover
			placement={"bottom"}
			content={content}
			onVisibleChange={() => refetch()}
		>
			组员
		</Popover>
	);
};

const ContentContainer = styled.div`
	min-width: 30rem;
`;
