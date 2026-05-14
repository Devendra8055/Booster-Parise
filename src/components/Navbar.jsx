import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "green" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        Home
      </Link>

      <Link to="/products" style={{ color: "white", marginRight: "20px" }}>
        Products
      </Link>

      <Link to="/cart" style={{ color: "white" }}>
        Cart
      </Link>
    </nav>
  );
}