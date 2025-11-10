import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Product 1",
        price: 100,
        image: "https://via.placeholder.com/150",
        stock: 10,
      },
      {
        title: "Product 2",
        price: 200,
        image: "https://via.placeholder.com/150",
        stock: 20,
      },
      {
        title: "Product 3",
        price: 300,
        image: "https://via.placeholder.com/150",
        stock: 30,
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts?.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Failed to seed products", err);
  }
};
