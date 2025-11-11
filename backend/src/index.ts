import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { seedInitialProducts } from "./services/productService.js";
import cartRoute from "./routes/cartRoute.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });
seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
