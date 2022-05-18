import React from "react";
import { SearchPanel } from "./search_panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([]);

	const [param, setParam] = useState({
		name: "",
		personId: "",
	});
	const [list, setList] = useState([]);
	const debouncedParam = useDebounce(param, 200);
	const client = useHttp();

	//请求数据
	useEffect(() => {
		client("projects", { data: cleanObject(debouncedParam) }).then(setList);
	}, [debouncedParam]);

	//初始化项目列表
	useMount(() => {
		client("users").then(setUsers);
	});

	return (
		<div>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List users={users} list={list} />
		</div>
	);
};
