import CartModel, { type ICart, type ICartItem } from "../models/cartModel.js";
import { orderModel, type IOrderItem } from "../models/orderModel.js";
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
  populateProduct?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: GetActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await CartModel.findOne({ userId, status: "active" }).populate(
      "items.product"
    );
  } else {
    cart = await CartModel.findOne({ userId, status: "active" });
  }

  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  let cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: string;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Dees the item exists in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
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
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: parseInt(quantity),
  });
  cart.totalAmount += product.price * parseInt(quantity);
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
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

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  existsInCart.quantity = quantity;

  total += existsInCart.unitPrice * existsInCart.quantity;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface DeleteItemFromCart {
  userId: string;
  productId: any;
}
export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeleteItemFromCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existsInCart) {
    return { data: "Item not found in the cart", statusCode: 404 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  const total = calculateCartTotalItems({ cartItems: otherCartItems });
  cart.items = otherCartItems;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);
  return total;
};

interface CheckoutCart {
  userId: string;
  address: string;
}
export const checkoutCart = async ({ userId, address }: CheckoutCart) => {
  if (!address) {
    return { data: "Address is required", statusCode: 400 };
  }
  let cart: any = await getActiveCartForUser({ userId });
  const orderItems: IOrderItem[] = [];

  // Loop cartItems and create orderItems
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product not found", statusCode: 404 };
    }
    const orderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId: cart.userId,
  });
  await order.save();
  // Update the cart status to be completed
  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
