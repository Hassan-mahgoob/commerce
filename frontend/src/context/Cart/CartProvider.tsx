import { type FC, type PropsWithChildren, useState } from "react";
import { type CartItem } from "../../types/CartItem";
import { CartContext } from "./Cartcontext";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const { token } = useAuth();
  const addItemTocart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!response.ok) {
        setError("Failed to add item to cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data");
      }
      const cartIemsMapped = cart.items.map(
        (
          product: { _id: string; title: string; image: string; price: number },
          quantity: number
        ) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        })
      );
      setCartItems([...cartIemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemTocart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
