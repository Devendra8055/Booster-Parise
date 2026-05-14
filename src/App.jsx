import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Booster Parise
        </h1>

        <p
          style={{
            fontSize: "20px",
          }}
        >
          Empowering Agriculture With Innovation
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/manage-products"
          element={<ManageProducts />}
        />
      </Routes>
    </>
  );
}