import ShoppingCartContext from "./ShoppingCartContext";
// import type { CartItem } from "@/types/custom";
// import useLocalStorage from "@/hooks/useLocalStorage";
import shoppingCartReducer from "@/reducers/shoppingCartReducer";
// import { useReducer } from "react";
import usePresistedReducer from "@/hooks/usePresistedReducer";
import useShoppingCartAction from "@/hooks/useShoppingCartAction";

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, dispatch] = usePresistedReducer(
    shoppingCartReducer,
    "shopping-cart",
    [],
  );

  const { addToCart, removeFromCart, updateItem, clearCart } =
    useShoppingCartAction(dispatch);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
