import hero_small_image from "~img/hero_small.jpg";
import hero_image from "~img/hero.jpg";
import Button from "./Button";
import IconButton from "./IconButton";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ImageHero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-black-500 text-white mb-2">
      <img
        src={hero_small_image}
        alt="Hero"
        className="w-full h-[480px] object-cover block md:hidden"
      />
      <img
        src={hero_image}
        alt="Hero"
        className="w-full h-[480px] object-cover hidden md:block"
      />
      <div className="absolute inset-4 flex flex-col p-2 items-center justify-end text-center md:justify-start ">
        <div className="text-4xl md:text-6xl font-bold">iphone 14 Pro</div>
        <div className="mt-4 flex space-x-4">
          <IconButton
            variant="primary"
            title="了解更多"
            icon={<MdOutlineNavigateNext />}
            iconPosition="right"
            onClick={() => navigate("/product-detail/12")}
          ></IconButton>
          <IconButton
            variant="outline"
            title="购买"
            icon={<AiOutlineShoppingCart />}
            iconPosition="right"
          ></IconButton>
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
