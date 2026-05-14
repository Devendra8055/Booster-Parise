const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./Models/Product");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/boosterparise")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});


// ADD PRODUCT API
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});


// GET PRODUCTS API
app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});
app.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
app.put("/update-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});