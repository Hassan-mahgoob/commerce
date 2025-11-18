import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { useCart } from "../context/Cart/Cartcontext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity == 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItemFromCart = (productId: string) => {
    removeItemFromCart(productId);
  };
  const navigate = useNavigate();

  return (
    <Container fixed sx={{ mt: 2, width: "50%" }}>
      <Typography mb={2} variant="h4">
        CartPage
      </Typography>
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
              <Button onClick={() => handleRemoveItemFromCart(item.productId)}>
                Remove Item
              </Button>
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
      {cartItems.length === 0 ? (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            color: "red",
          }}
          fontWeight={"bold"}
          variant="h4"
        >
          Your cart is empty
        </Typography>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Total Amount: {totalAmount} SDG</Typography>
          <Button variant="contained" size="large" onClick={() => navigate("/Checkout")}>
            Checkout
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
