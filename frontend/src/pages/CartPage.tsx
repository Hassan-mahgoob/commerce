import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!token) {
      setError("You are not logged in");
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed to fetch cart, please try again later");
      }
      const data = await response.json();
      setCart(data);
    };
    fetchCart();
  }, [token]);
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">CartPage</Typography>
      {error && (
        <Typography variant="body1" sx={{ mt: 2 }} color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
