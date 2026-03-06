import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CultureCode } from "./i18nReducer";

export interface I18nState {
  currentLanguage: CultureCode;
}

const initialState: I18nState = {
  currentLanguage: "zh-CN", // 默认语言
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setCulture: (state, action: PayloadAction<CultureCode>) => {
      // rtk 内置了 Immer
      // 可以直接修改 state, Immer 会帮我们转换为不可变数据 更新
      state.currentLanguage = action.payload;
    },
  },
});

export const { setCulture } = i18nSlice.actions;

export default i18nSlice.reducer;
