import catchAsync from "../../utils/catchAsync.js";
import Product from "../../model/productModel.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  const isExist = await Product.find({ name });

  if (isExist.length > 0) {
    return res.status(409).json({
      message: "Product already exist in database",
    });
  }

  const newProd = new Product({
    name,
    price,
  });
  const savedProd = await newProd.save();
  return res.status(201).json({
    status: true,
    message: "Product create successfully!",
    prod: savedProd,
  });
});
