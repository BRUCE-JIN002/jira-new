import { useCallback, useReducer, useState } from "react";
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

//默认配置选项
const defaultConfig = {
  throwOnError: false,
};

//安全分发, 组件未挂载时，不分发 action
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => {
      mountedRef.current ? dispatch(...args) : void 0;
    },
    [dispatch, mountedRef]
  );
};

//处理异步操作时的状态管理
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  //retry重新刷新页面
  //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  //数据处理
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  //错误处理
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        stat: "error",
      }),
    [safeDispatch]
  );

  //用来触发异步请求， 使用useCallback包裹自定义返回的函数
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      //判断传入的数据类型
      if (!promise || !promise.then) {
        throw new Error("请传入 promise 类型的数据");
      }
      //改变retry函数的作用
      setRetry(() => () => {
        //有runConfig的时候再执行
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      //返回一个promise
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          //catch 会消化异常， 如果不会主动抛出错误， 外面接受不到异常
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

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
