import { useParams } from "react-router-dom";
import useApiData from "@/hooks/useApiData";
import type { Category as CategoryType } from "@/types/custom";
import { Skeleton } from "@/components/Skeleton";
import VideoHero from "@/components/VideoHero";
import TextHeader from "@/components/TextHeader";
import ImageSlider from "@/components/ImageSlider";
import CompareTable from "@/components/CompareTable";

type CategoryParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<CategoryParams>();
  if (category == null) {
    throw new Error("Category not found");
  }

  // 使用自定义钩子获取数据
  const {
    data: productCategory,
    loading,
    error,
  } = useApiData<CategoryType>(`/api/categories/${category}`);

  console.log("Category Data:", productCategory, error);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* 标题 */}
      <TextHeader
        title={productCategory!.title}
        subTitle={productCategory!.subTitle}
      />
      {/* 视频展示 */}
      <VideoHero
        videoSrc={productCategory!.videos.regularSrc}
        videoSmallSrc={productCategory!.videos.smallSrc}
      />
      {/* 走马灯 */}
      <ImageSlider features={productCategory!.features} />
      {/* 系列产品比较 Table */}
      <CompareTable products={productCategory!.products} />
    </div>
  );
};

export default Category;
