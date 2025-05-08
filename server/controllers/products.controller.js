import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req, res) => {
  const { title, description, price, category, image } = req.body;

  if (!title || !description || !price || !category || !image) {
    return res.status(400).json({
      message: "Title, description, price, category, and image are required.",
    });
  }

  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      image,
    });

    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const productById = async (req, res) => {
  const { id } = req.params;

  try {
    const productFound = await Product.findById(id);

    if (!productFound) {
      res.status(400).json({ message: "No hay ningun producto con es ID." });
    }

    res.json(productFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
