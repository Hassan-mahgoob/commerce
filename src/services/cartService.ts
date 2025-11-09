import CartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface CreateCartForUser {
  userId: string;
}

export const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await CartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: string;
}

export const addItemToCart = async ({ userId, productId, quantity }: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Dees the item exists in the cart?
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if (existsInCart) {

    return { data: "Item already exists in the cart", statusCode: 400 };
  }
  // Fetch the product
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }

  if (product.stock < parseInt(quantity)) {
    return { data: "Product out of stock", statusCode: 400 };
  }
  cart.items.push({ product: productId, unitPrice: product.price, quantity: parseInt(quantity) });
  cart.totalAmount += product.price * parseInt(quantity);
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({ userId, productId, quantity }: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if (!existsInCart) {
    return { data: "Item not found in the cart", statusCode: 404 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }
  if (product.stock < quantity) {
    return { data: "Product out of stock", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);
  existsInCart.quantity = quantity;


  total += existsInCart.unitPrice * existsInCart.quantity;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
}