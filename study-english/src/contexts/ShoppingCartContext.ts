import { createContext } from "react";
import type { CartItem } from "@/types/custom";

interface ShoppingCartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default ShoppingCartContext;
