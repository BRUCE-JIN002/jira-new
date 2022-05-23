import React, { Fragment } from "react";

//高亮标记
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
	if (!keyword) {
		return <>{name}</>;
	}
	const arr = name.split(keyword);
	return (
		<Fragment>
			{arr.map((str, index) => (
				<span key={index}>
					{str}
					{index === arr.length - 1 ? null : (
						<span style={{ color: "#257AFD" }}>{keyword}</span>
					)}
				</span>
			))}
		</Fragment>
	);
};
