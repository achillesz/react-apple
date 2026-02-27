import { useState } from "react";
import ShoppingCartContext from "./ShoppingCartContext";
import type { CartItem } from "@/types/custom";

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.productId === item.productId,
    );
    if (existingItemIndex !== -1) {
      // If the item already exists, update the quantity
      setCartItems((prevItems) => [
        ...prevItems.slice(0, existingItemIndex),
        {
          ...prevItems[existingItemIndex],
          quantity: (prevItems[existingItemIndex]?.qty ?? 0) + 1,
        },
        ...prevItems.slice(existingItemIndex + 1),
      ]);
    } else {
      // If the item does not exist, add it to the cart
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => [
      ...prevItems.slice(0, index),
      ...prevItems.slice(index + 1),
    ]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
