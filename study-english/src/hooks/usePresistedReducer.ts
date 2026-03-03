import { type Dispatch, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
// 帮我引入 immer 库
import { useImmerReducer, type ImmerReducer } from "use-immer";

const usePresistedReducer = <S, A>(
  reducer: ImmerReducer<S, A>,
  key: string,
  initialState: S,
): [S, Dispatch<A>] => {
  // 1. 先从 localStorage 读状态
  const [presistedState, setPresistedState] = useLocalStorage<S>(
    key,
    initialState,
  );

  // 2. 把 reducer 和持久化状态结合
  const [state, dispatch] = useImmerReducer(reducer, presistedState);

  // 3. 状态变化时，自动同步到 localStorage
  useEffect(() => {
    setPresistedState(state);
  }, [state, setPresistedState]);

  return [state, dispatch] as const;
};

export default usePresistedReducer;
