import type { CartItem as CartItemType } from "@/types/custom";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <>
      <div className="flex mt-6 p-0 w-full">
        {/* 图片 */}
        <div className="w-1/3 flex items-center">
          <img src={item.imageSrc} alt="" className="h-24 pl-4" />
        </div>
        {/* 商品信息 */}
        <div className="w-2/3 flex flex-col justify-between">
          <p className="text-xl">{item.name}</p>
          <div className="flex items-center space-x-2">
            <p className="text-sm truncate w-50">
              {item.color} | {item.memorySize} | {item.model}
            </p>
            <p className="text-sm font-semibold">
              ¥{" "}
              {(
                item.modelPrice ?? 0 + (item.memorySizePrice ?? 0)
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-6 pt-2 border-t border-apple-gray-200 dark:border-apple-gray-800" />
    </>
  );
};

export default CartItem;
