import { createContext, useContext } from "react";
import { type CartItem } from "../../types/CartItem";
interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemTocart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemTocart: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
