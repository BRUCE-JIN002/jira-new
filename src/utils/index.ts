import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
	// Object.assign({}, object)
	const result = { ...object };
	Object.keys(result).forEach((key) => {
		// @ts-ignore
		const value = result[key];
		if (isFalsy(value)) {
			//@ts-ignore
			delete result[key];
		}
	});
	return result;
};

//自定义hook
//在页面刚加载使执行一次的函数
export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback();
	}, []);
};

//防抖
export const useDebounce = <V>(value: V, delay?: number): any => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		//在每次value变化以后，设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};

//useArray实现一个添加名称的功能
//实验性的hooks
export const useArray = <T>(initialArray: T[]) => {
	const [value, setValue] = useState(initialArray);
	return {
		value,
		setValue,
		add: (item: T) => setValue([...value, item]),
		clear: () => setValue([]),
		removeIndex: (index: number) => {
			const copy = [...value];
			copy.splice(index, 1);
			setValue(copy);
		},
	};
};
