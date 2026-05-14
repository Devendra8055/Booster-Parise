const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./Models/Product");

const app = express();

app.use(cors());
app.use(express.json());


// MONGODB ATLAS CONNECTION
mongoose
.connect(
  "mongodb+srv://ownsdevil_db_user:PASSWORD@cluster0....mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// TEST ROUTE
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
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});


// DELETE PRODUCT API
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


// UPDATE PRODUCT API
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


// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});