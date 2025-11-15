import { Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const { cartItems } = useCart();
  // useEffect(() => {
  //   if (!token) {
  //     setError("You are not logged in");
  //   }
  //   const fetchCart = async () => {
  //     const response = await fetch(`${BASE_URL}/cart`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       setError("Failed to fetch cart, please try again later");
  //     }
  //     const data = await response.json();
  //     setCart(data);
  //   };
  //   fetchCart();
  // }, [token]);
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">CartPage</Typography>
      {cartItems.map((item) => (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {item.title}
        </Typography>
      ))}
    </Container>
  );
};

export default CartPage;
