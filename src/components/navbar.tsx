// import React from "react";
// import { CheckCircle2 } from "lucide-react";
// import "../style/navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const NAV_LINKS = [
//   { label: "Home", path: "/" },
//   { label: "Take Survey", path: "/take-survey" },
// ];

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const { user, profile, logout } = useAuth();

//   const displayName = profile?.full_name || user?.email || "";

//   const handleAuthClick = async () => {
//     if (user) {
//       await logout();
//       navigate("/");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       <header className="navbar">
//         <div className="navbar__inner">
//           <div className="navbar__brand">
//             <span className="navbar__logo">
//               <CheckCircle2 size={18} strokeWidth={2.5} />
//             </span>
//             <span className="navbar__title">SurveyHub</span>
//           </div>

//           <nav className="navbar__links">
//             {NAV_LINKS.map((link) => (
//               <Link key={link.path} to={link.path}>
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           <button className="navbar__login-btn" onClick={handleAuthClick}>
//             {user ? "Logout" : "Login"}
//           </button>
//         </div>
//       </header>

//       {user && (
//         <div className="navbar__welcome">
//           Welcome, <strong>{displayName}</strong>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import React from "react";
import "../style/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";       


import surveyLogo from "../assets/survey_logo.svg";
const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Take Survey", path: "/take-survey" },
  { label: "Surveys", path: "/surveys" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  const displayName = profile?.full_name || user?.email || "";
  const isAdmin = profile?.role === "Admin";

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="navbar">
        
          <div className="logo">
            <img
            src={surveyLogo}
             alt="Survey Logo"
            className="logo"
             />
            
            <span className="SurveyHub">SurveyHub</span>
          </div>
          

          <nav className="navbar__links">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
            {isAdmin && <Link to="/create-survey">Create Survey</Link>}
          </nav>

          <button className="navbar__login-btn" onClick={handleAuthClick}>
            {user ? "Logout" : "Login"}
          </button>
        
      </header>

      {user && (
        <div className="navbar__welcome">
          Welcome, <strong>{displayName}</strong>
        </div>
      )}
    </>
  );
};

export default Navbar;
