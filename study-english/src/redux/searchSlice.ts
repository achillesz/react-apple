import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Product } from "@/types/custom";

export const fetchSearchResults = createAsyncThunk<
  Product[],
  { keyword: string }
>("search", async ({ keyword }: { keyword: string }, { signal }) => {
  const controller = new AbortController();
  signal.addEventListener("abort", () => {
    controller.abort();
  });

  const response = await fetch(
    `http://152.136.182.210:12231/api/products?search=${encodeURIComponent(keyword)}`,
    { signal: controller.signal },
  );

  if (response.status === 404) {
    throw new Error("No products found"); // 抛出的错误会自动进入 rtk 的 rejected 状态
  }

  if (!response.ok) {
    throw new Error("Network response was not ok"); // 其他网络错误 也抛出错误
  }

  const data = await response.json();
  return data as Product[]; // 返回的数据会自动进入 RTK 的 fullfiled 分支
});

interface SearchState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  items: [],
  isLoading: false,
  error: null,
};

import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        if (action.error.name === "AbortError") {
          // 请求被取消，不更新状态
          state.error = "请求已取消";
        } else {
          state.error =
            action.error.message || "Failed to fetch search results";
        }

        state.isLoading = false;

        state.items = [];
      });
  },
});

export default searchSlice.reducer;
