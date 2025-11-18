import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useCart } from "../context/Cart/Cartcontext";
import { useRef } from "react";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef(null);

  return (
    <Container fixed sx={{ mt: 2, width: "50%" }}>
      <Typography mb={2} variant="h4">
        CheckoutPage
      </Typography>
      <Box
        sx={{
          border: 1,
          borderColor: "grey",
          borderRadius: 2,
          boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
          p: 3,
          mb: 2,
          width: "70%",
        }}
      >
        <TextField
              inputRef={addressRef}
              label="Delivery Address"
              variant="outlined"
              fullWidth
            />
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            gap={2}
            p={1}
            mb={2}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              gap={2}
            >
              <img src={item.image} alt={item.title} width={100} height={100} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body1">
                  {item.unitPrice} X {item.quantity} SDG
                </Typography>
              </Box>
            </Box>
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
            width="100%"
          >
            <Typography variant="h6" fontWeight={"bold"} color="primary">
              Total Amount: {totalAmount} SDG
            </Typography>
          </Box>
        )}
      </Box>

      <Button variant="contained" size="large">
        Pay Now
      </Button>
    </Container>
  );
};

export default CheckoutPage;
