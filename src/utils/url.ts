import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

//返回页面 url中， 指定键的参数值
//如: name=骑手&personId=18

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
	const [searchParams, setSearchParam] = useSearchParams();

	return [
		useMemo(
			() =>
				keys.reduce((prev, key) => {
					return { ...prev, [key]: searchParams.get(key) || "" };
				}, {} as { [key in K]: string }),
			[setSearchParam]
		),
		(params: Partial<{ [key in K]: unknown }>) => {
			const o = cleanObject({
				...Object.fromEntries(searchParams),
				...params,
			}) as URLSearchParamsInit;
			return setSearchParam(o);
		},
	] as const;
};
