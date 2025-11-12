import { Box, Container, Grid } from "@mui/material";
import ProductCart from "../components/ProductCartd";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchProducts();
  }, []);
  if (error) {
    return (
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontWeight: "bold",
          fontFamily: "monospace",
          fontSize: "2rem",
          color: "red",
        }}
      >
        Something went wrong
      </Box>
    );
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={4}>
            <ProductCart
              _id={p._id}
              title={p.title}
              price={p.price}
              image={p.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
