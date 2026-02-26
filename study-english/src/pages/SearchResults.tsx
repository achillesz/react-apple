import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "@/types/custom";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1"); // 获取页码，默认为1

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: query || "", page: newPage.toString() });
  };

  const [searchResults, setSearchResults] = useState<Product[]>([]); // 假设这是从API获取的搜索结果

  // http://152.136.182.210:12231/api/products?keyword=MacBook
  async function fetchSearchResults(keyword: string | null, page: number) {
    // 模拟一个异步请求，实际应用中应调用后端API
    return await fetch(
      `http://152.136.182.210:12231/api/products?keyword=${keyword}&page=${page}`,
    );
  }

  // 1
  useEffect(() => {
    const search = async () => {
      const res = await fetchSearchResults(query, page);
      const data = await res.json();
      // 模拟数据请求
      console.log("搜索结果：", data);

      setSearchResults(data);
    };
    search();
  }, [query, page]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <p className="text-gray-600">
        搜索关键词
        {query ? `"${query}"` : "未指定"}
      </p>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product.id} className="mb-2">
              <h2 className="text-lg font-semibold">
                {product.name} - {product.startingPrice}
              </h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>暂无搜索结果</p>
      )}
      <button onClick={() => handlePageChange(page - 1)}>上一页</button>
      <button onClick={() => handlePageChange(page + 1)}>下一页</button>
    </div>
  );
};

export default SearchResults;
