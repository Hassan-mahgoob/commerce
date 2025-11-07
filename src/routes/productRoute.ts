import express from "express";
import { getAllProducts } from "../services/productService.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

export default router;
