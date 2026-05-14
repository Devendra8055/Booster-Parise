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

  const fetchProducts = async () => {
    const response = await fetch(
      "http://localhost:5000/products"
    );

    const data = await response.json();

    setProducts(data);
  };

  const startEditing = (product) => {
    setEditingId(product._id);

    setEditData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  const updateProduct = async () => {
    const response = await fetch(
      `http://localhost:5000/update-product/${editingId}`,
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
  };

  const deleteProduct = async (id) => {
    const response = await fetch(
      `http://localhost:5000/delete-product/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchProducts();
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
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

          <br />

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
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
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
              transition: "0.3s",
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
5
            <div style={{ padding: "15px" }}>
              <h2
                 
                 style={{
                 fontSize: "24px",
                 marginBottom: "10px",
                }}
                  >
                {product.name}
              </h2>

              <h3
                style={{
                  color: "green",
                }}
              >
                ₹ {product.price}
              </h3>

              <p
                style={{
                color: "#555",
                lineHeight: "1.6",
             }}
             >
               {product.description}
              </p>

              {/* EDIT BUTTON */}
              <button
                onClick={() => startEditing(product)}
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  padding: "10px 20px",
                  background: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteProduct(product._id)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
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