import { useState } from "react";

export default function ManageProducts() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    const response = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message);
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h1>Add Product</h1>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        style={input}
      />

      <input
        type="text"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        style={input}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        style={input}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        style={input}
      />

      <button onClick={addProduct} style={btn}>
        Add Product
      </button>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid gray",
};

const btn = {
  padding: "12px 25px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};