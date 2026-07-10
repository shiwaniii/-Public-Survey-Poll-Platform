import { Link } from "react-router-dom";
// import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">SurveyHub</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create">Create Survey</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}