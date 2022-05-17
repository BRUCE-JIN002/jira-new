import { useArray, useMount } from "./utils";
import React, { useState } from "react";

export const TsReactTest = () => {
	const persons: { name: string; age: number }[] = [
		{ name: "jack", age: 25 },
		{ name: "ma", age: 22 },
	];
	const { value, clear, removeIndex, add } = useArray(persons);

	return (
		<div>
			{/*期待: 点击以后增加 john */}
			<button onClick={() => add({ name: "john", age: 22 })}>add john</button>
			{/*期待: 点击以后删除第一项*/}
			<button onClick={() => removeIndex(0)}>remove 0</button>
			{/*期待：点击以后清空列表*/}
			<button style={{ marginBottom: "50px" }} onClick={() => clear()}>
				clear
			</button>

			{value.map((person, index) => (
				<div style={{ marginBottom: "30px" }}>
					<span style={{ color: "red" }}>{index}</span>
					<span>{person.name}</span>
					<span>{person.age}</span>
				</div>
			))}
		</div>
	);
};
