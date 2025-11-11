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
        title: "Galaxy",
        price: 100,
        image:
          "https://images.search.yahoo.com/images/view;_ylt=AwriiJUf8RJpvX0q8xyJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2U4MGZjNzNiMWMyZjA1YjM5ZTY3MjAwZWE1NzYwZGIzBGdwb3MDMgRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3D%25D8%25B3%25D8%25A7%25D9%2585%25D8%25B3%25D9%2588%25D9%2586%25D8%25AC%26type%3DE210US91105G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D2&w=2000&h=1333&imgurl=media.extra.com%2Fs%2Faurora%2F100392606_800%2FSAMSUNG-Galaxy-S25-Ultra%252C-5G%252C-512-GB%252C-Titanium-Silverblue%3Flocale%3Den-GB%2Car-%2A%2C%2A&rurl=https%3A%2F%2Fwww.extra.com%2Far-om%2Fmobiles-tablets%2Fmobiles%2Fsmartphone%2Fsamsung-galaxy-s25-ultra-5g-512-gb-titanium-silverblue%2Fp%2F100392606&size=61KB&p=%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%D8%AC&oid=e80fc73b1c2f05b39e67200ea5760db3&fr2=piv-web&fr=mcafee&tt=%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%D8%AC+%D8%AC%D8%A7%D9%84%D8%A7%D9%83%D8%B3%D9%8A+%D8%A7%D8%B3+25+%D8%A7%D9%84%D8%AA%D8%B1%D8%A7%D8%8C+5+%D8%AC%D9%8A%D8%8C+512+%D8%AC%D9%8A%D8%AC%D8%A7%D8%8C+%D8%A3%D8%B2%D8%B1%D9%82+%D8%B3%D9%85%D8%A7%D9%88%D9%8A+%D8%AA%D9%8A%D8%AA%D8%A7%D9%86%D9%8A%D9%88%D9%85+...&b=0&ni=21&no=2&ts=&tab=organic&sigr=T0l_chTlsxIM&sigb=lwZynniYXwIu&sigi=cs2QX4VdKFhz&sigt=q3oB0FA7QwXg&.crumb=xjYAbNPOfBz&fr=mcafee&fr2=piv-web&type=E210US91105G0",
        stock: 10,
      },
      {
        title: "iphone ",
        price: 200,
        image:
          "https://tse2.mm.bing.net/th/id/OIP.azIej7bJLFwzUlD5Mb939gHaEK?pid=Api&P=0&h=220",
        stock: 20,
      },
      {
        title: "Huawei",
        price: 300,
        image:
          "https://tse3.mm.bing.net/th/id/OIP.x62VRCEu3eWocYP-Jl0ItgHaHa?pid=Api&P=0&h=220",
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
