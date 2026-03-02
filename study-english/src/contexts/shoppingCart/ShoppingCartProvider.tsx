import ShoppingCartContext from "./ShoppingCartContext";
import type { CartItem } from "@/types/custom";
import useLocalStorage from "@/hooks/useLocalStorage";

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);

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
          qty: (prevItems[existingItemIndex]?.qty ?? 0) + 1,
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

  const updateItem = (index: number, newItem: CartItem) => {
    setCartItems((prevItems) => {
      if (index < 0 || index >= prevItems.length) {
        console.error("Index out of bounds");
        return prevItems;
      }
      return [
        ...prevItems.slice(0, index),
        newItem,
        ...prevItems.slice(index + 1),
      ];
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateItem }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
