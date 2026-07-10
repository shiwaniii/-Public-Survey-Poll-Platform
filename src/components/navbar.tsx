// import { Link } from "react-router-dom";
// // import "./Navbar.css";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">SurveyHub</h2>

//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/create">Create Survey</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </nav>
//   );
// }


import React from "react";
import { CheckCircle2 } from "lucide-react";
import "../style/navbar.css";

const NAV_LINKS = ["Home", "Dashboard", "Create Survey", "Login"];

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__logo">
            <CheckCircle2 size={18} strokeWidth={2.5} />
          </span>
          <span className="navbar__title">SurveyHub</span>
        </div>

        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </nav>

        <button className="navbar__cta">Take Survey</button>
      </div>
    </header>
  );
};

export default Navbar;
