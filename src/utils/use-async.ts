import { stat } from "fs";
import { useState } from "react";
import { useMountedRef } from "utils";

//统一处理异步逻辑的状态管理, loading 和 error的状态
interface State<D> {
	error: Error | null;
	data: D | null;
	stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
	stat: "idle",
	data: null,
	error: null,
};

//默认配置选项： 是否可以
const defaultConfig = {
	throwOnError: false,
};

export const useAsync = <D>(
	initialState?: State<D>,
	initialConfig?: typeof defaultConfig
) => {
	const config = { ...defaultConfig, initialConfig };
	const [state, setState] = useState<State<D>>({
		...defaultInitialState,
		...initialState,
	});
	const mountedRef = useMountedRef();
	//retry重新刷新页面
	//useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
	const [retry, setRetry] = useState(() => () => {});

	//数据处理
	const setData = (data: D) =>
		setState({
			data,
			stat: "success",
			error: null,
		});

	//错误处理
	const setError = (error: Error) =>
		setState({
			error,
			data: null,
			stat: "error",
		});

	//用来触发异步请求
	const run = (
		promise: Promise<D>,
		runConfig?: { retry: () => Promise<D> }
	) => {
		if (!promise || !promise.then) {
			throw new Error("请传入 promise 类型的数据");
		}
		setRetry(() => () => {
			//有runConfig的时候再执行
			if (runConfig?.retry) run(runConfig?.retry(), runConfig);
		});
		setState({ ...state, stat: "loading" });
		return promise
			.then((data) => {
				if (mountedRef.current) {
					setData(data);
				}
				return data;
			})
			.catch((error) => {
				//catch 会消化异常， 如果不会主动抛出错误， 外面接受不到异常
				setError(error);
				if (config.throwOnError) return Promise.reject(error);
				return error;
			});
	};

	return {
		isIdle: state.stat === "idle",
		isLoading: state.stat === "loading",
		isError: state.stat === "error",
		isSuccess: state.stat === "success",
		run,
		setData,
		setError,
		//retry 被调用时重新跑一遍 run, 让 state 刷新一遍
		retry,
		...state,
	};
};
