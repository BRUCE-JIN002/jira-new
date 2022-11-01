import React from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "../../types/user";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "../../types/project";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  //收藏项目
  const { mutate } = useEditProject(useProjectsQueryKey());
  //得到收藏的项目
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      scroll={{ y: 560 }}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          title: "更多操作",
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  //编辑项目
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  //
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  //获取编辑框的打开函数
  // const { open } = useProjectModal();
  //确认删除
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(project.id)}>
            <ButtonNoPadding type={"link"}>编辑</ButtonNoPadding>
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            <ButtonNoPadding type={"link"}>删除</ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding style={{ paddingLeft: "2rem" }} type={"link"}>
        ...
      </ButtonNoPadding>
    </Dropdown>
  );
};
