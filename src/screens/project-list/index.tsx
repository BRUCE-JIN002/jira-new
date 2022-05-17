import React from "react";
import { SearchPanel } from "./search_panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([]);

	const [param, setParam] = useState({
		name: "",
		personId: "",
	});
	const [list, setList] = useState([]);
	const debouncedParam = useDebounce(param, 200);

	//请求数据
	useEffect(() => {
		fetch(
			`${apiUrl}/projects${qs.stringify(cleanObject(debouncedParam))}`
		).then(async (response) => {
			if (response.ok) {
				setList(await response.json());
			}
		});
	}, [debouncedParam]);

	//初始化项目列表
	useMount(() => {
		fetch(`${apiUrl}/users`).then(async (response) => {
			if (response.ok) {
				setUsers(await response.json());
			}
		});
	});

	return (
		<div>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List users={users} list={list} />
		</div>
	);
};
