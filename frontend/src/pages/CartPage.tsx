import { Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/Cartcontext";

const CartPage = () => {
  const { cartItems } = useCart();

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
