import express from "express";
import {
  addItemToCart,
  clearCart,
  checkoutCart,
  deleteItemFromCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendedRequest } from "../types/extendedRequest.js";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to get active cart", error);
    res.status(500).send("Failed to get active cart");
  }
});

router.delete("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Failed to clear cart", error);
    res.status(500).send("Failed to clear cart");
  }
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Failed to add item to cart", error);
    res.status(500).send("Failed to add item to cart");
  }
});
router.put("/items/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;

    const { quantity, productId } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Failed to update item in cart", error);
    res.status(500).send("Failed to update item in cart");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendedRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const response = await deleteItemFromCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      console.error("Failed to delete item from cart", error);
      res.status(500).send("Failed to delete item from cart");
    }
  }
);

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const response = await checkoutCart({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("Failed to checkout cart", error);
    res.status(500).send("Failed to checkout cart");
  }
});
export default router;
