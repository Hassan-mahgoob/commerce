import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { useCart } from "../context/Cart/Cartcontext";

const CartPage = () => {
  const { cartItems, updateItemInCart, removeItemFromCart } = useCart();
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity == 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItemFromCart = (productId: string) => {
    removeItemFromCart(productId);
  };

  return (
    <Container fixed sx={{ mt: 2, width: "50%" }}>
      <Typography variant="h4">CartPage</Typography>
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          p={2}
          mb={2}
          sx={{
            border: 1,
            borderColor: "grey",
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <img src={item.image} alt={item.title} width={100} height={100} />
            <Box>
              <Typography variant="body1">{item.title}</Typography>
              <Typography variant="body1">
                {item.unitPrice} X {item.quantity} SDG
              </Typography>
              <Button onClick={() => handleRemoveItemFromCart(item.productId)}>Remove Item</Button>
            </Box>
          </Box>
          <ButtonGroup variant="contained" size="small">
            <Button
              onClick={() =>
                handleQuantityChange(item.productId, item.quantity - 1)
              }
            >
              -
            </Button>
            <Button
              onClick={() =>
                handleQuantityChange(item.productId, item.quantity + 1)
              }
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">
          Total Amount:{" "}
          {cartItems.reduce(
            (acc, item) => acc + item.unitPrice * item.quantity,
            0
          )}{" "}
          SDG
        </Typography>
      </Box>
    </Container>
  );
};

export default CartPage;
