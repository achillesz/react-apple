import { useState, useContext } from "react";
import SkuSelect from "./SkuSelect";
import { produce } from "immer";
import type { Product, CartItem } from "@/types/custom";
import { ShoppingCartContext } from "@/contexts";

type ProductHeroProps = {
  product: Product;
  imageUrl: string;
};

function ProductHero({ product, imageUrl }: ProductHeroProps) {
  // const [selectedModel, setSelectedModel] = useState<string>("");
  // const [selectedColor, setSelectedColor] = useState<string>("");
  // const [selectedMemorySize, setSelectedMemorySize] = useState<string>("");
  const { addToCart } = useContext(ShoppingCartContext);

  // 加入购物车的商品项状态

  const [cartItem, setcartItem] = useState<CartItem>({
    id: 0,
    productId: product.id,
    name: product.name,
    imageSrc: imageUrl,
    modelId: null,
    modelPrice: null,
    model: null,
    color: null,
    memorySize: null,
    memorySizeId: null,
    memorySizePrice: null,
    qty: null,
  });

  const updatecartItem = (updates: Partial<CartItem>) =>
    produce((draft: CartItem) => {
      Object.assign(draft, updates);
    });

  const handleAddToCart = () => {
    if (
      !cartItem.model ||
      !cartItem.color ||
      !cartItem.memorySize ||
      !cartItem.modelId ||
      !cartItem.memorySizeId
    ) {
      alert("请先选择型号、颜色和储存容量");
      return;
    }
    addToCart(cartItem);
    console.log("已加入购物车:", cartItem);
  };

  return (
    <div
      className="flex flex-col lg:flex-row-reverse
        pt-8 mt-4 
        md:pt-28 lg:pt-52
        space-y-4
        text-apple-text-light dark:text-apple-text-dark
    "
    >
      <div className="flex-1 flex justify-center items-center">
        <img src={imageUrl} className="w-[350px] lg:-mt-32 lg:ml-19" />
      </div>
      <div className="flex-1 space-y-6 ml-6 md:ml-24">
        <div className="text-4xl font-black md:text-6xl">
          购买 {product.name}
        </div>
        <div className="font-medium md:text-xl">
          RMB {Number(product.startingPrice).toLocaleString("en-US")}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SkuSelect
            value={cartItem.model}
            onChange={(model) => {
              const selectedModel = product.models.find(
                (m) => m.name === model,
              );

              if (selectedModel) {
                setcartItem(
                  updatecartItem({
                    model,
                    modelId: selectedModel.id,
                    modelPrice: selectedModel.price,
                  }),
                );
              }
            }}
            placeholder={"型号"}
            options={product.models.map((model) => model.name)}
          />
          <SkuSelect
            value={cartItem.color}
            onChange={(color) => setcartItem(updatecartItem({ color }))}
            placeholder={"颜色"}
            options={product.colors}
          />
          <SkuSelect
            value={cartItem.memorySize}
            onChange={(memorySize) => {
              const selectedMemorySize = product.memorySizes.find(
                (m) => m.name === memorySize,
              );

              if (selectedMemorySize) {
                setcartItem(
                  updatecartItem({
                    memorySize,
                    memorySizeId: selectedMemorySize.id,
                    memorySizePrice: selectedMemorySize.price,
                  }),
                );
              }
            }}
            placeholder={"储存容量"}
            options={product.memorySizes.map((size) => size.name)}
          />
          <button
            className="
            border border-apple-blue
            px-5 py-2 bg-transparent
            rounded-md
            whitespace-nowrap
            min-w-[120px]
            hover:bg-apple-blue
            hover:text-apple-gray-100
          "
            onClick={() => {
              handleAddToCart();
            }}
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductHero;
