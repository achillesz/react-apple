import { createStore } from "redux";
import i18nReducer from "./i18nReducer";

const store = createStore(i18nReducer);
// 状态树的类型
export type RootState = ReturnType<typeof store.getState>;
export default store;
