export default function Dashboard() {
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        Admin Dashboard
      </h1>

      <p style={{ marginBottom: "40px" }}>
        Welcome to Booster Parise Admin Panel
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <a href="/manage-products" style={{ textDecoration: "none" }}>
          <button style={btn}>Manage Products</button>
        </a>

        <a href="/manage-orders" style={{ textDecoration: "none" }}>
          <button style={btn}>Manage Orders</button>
        </a>

        <a href="/manage-farmers" style={{ textDecoration: "none" }}>
          <button style={btn}>Manage Farmers</button>
        </a>
      </div>
    </div>
  );
}

const btn = {
  padding: "15px 25px",
  border: "none",
  background: "green",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "200px",
};