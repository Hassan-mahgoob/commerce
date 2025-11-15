import { type FC, type PropsWithChildren, useState } from "react";
import { type CartItem } from "../../types/CartItem";
import { CartContext } from "./Cartcontext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addItemTocart = (productId: string) => {
    console.log(productId);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemTocart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
