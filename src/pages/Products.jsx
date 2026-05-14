import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://booster-parise-backend.onrender.com/products"
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TO CART
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");
  };

  // START EDITING
  const startEditing = (product) => {
    setEditingId(product._id);

    setEditData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  // UPDATE PRODUCT
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `https://booster-parise-backend.onrender.com/update-product/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await response.json();

      alert(data.message);

      setEditingId(null);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://booster-parise-backend.onrender.com/delete-product/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "45px",
        }}
      >
        Our Products
      </h1>

      {/* EDIT FORM */}
      {editingId && (
        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            border: "1px solid gray",
            borderRadius: "10px",
            background: "white",
          }}
        >
          <h2>Edit Product</h2>

          <input
            type="text"
            placeholder="Name"
            value={editData.name}
            onChange={(e) =>
              setEditData({
                ...editData,
                name: e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Price"
            value={editData.price}
            onChange={(e) =>
              setEditData({
                ...editData,
                price: e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={editData.image}
            onChange={(e) =>
              setEditData({
                ...editData,
                image: e.target.value,
              })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={editData.description}
            onChange={(e) =>
              setEditData({
                ...editData,
                description: e.target.value,
              })
            }
            style={inputStyle}
          />

          <button
            onClick={updateProduct}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update Product
          </button>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "white",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h2>{product.name}</h2>

              <h3 style={{ color: "green" }}>
                ₹ {product.price}
              </h3>

              <p>{product.description}</p>

              {/* ADD TO CART */}
              <button
                onClick={() => addToCart(product)}
                style={greenButton}
              >
                Add To Cart
              </button>

              {/* EDIT */}
              <button
                onClick={() => startEditing(product)}
                style={orangeButton}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteProduct(product._id)}
                style={redButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid gray",
};

const greenButton = {
  marginTop: "10px",
  marginRight: "10px",
  padding: "10px 20px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const orangeButton = {
  marginTop: "10px",
  marginRight: "10px",
  padding: "10px 20px",
  background: "orange",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const redButton = {
  marginTop: "10px",
  padding: "10px 20px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};