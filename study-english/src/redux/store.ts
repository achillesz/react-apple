// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import i18nReducer, { setCulture } from "./i18nReducer";
import { i18nSlice } from "./i18nSlice";
import { searchSlice } from "./searchSlice";

const store = configureStore({
  reducer: {
    // 使用切片的 reducer
    i18n: i18nSlice.reducer,
    search: searchSlice.reducer,
  },
});

// const store = createStore(i18nReducer);
// 状态树的类型
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export default store;
