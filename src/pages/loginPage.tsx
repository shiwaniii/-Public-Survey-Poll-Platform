// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";


// function Login() {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem(email));

//     if (user && user.password === password) {

//       alert("Login Successful!");

//       navigate("/dashboard");

//     } else {

//       alert("Invalid Email or Password");

//     }
//   };

//   return (

//     <div className="container">

//       <div className="card">

//         <h1>Survey & Poll Platform</h1>

//         <h2>Sign In</h2>

//         <form onSubmit={handleSubmit}>

//           <input
//             type="email"
//             placeholder="Email"
//             onChange={(e)=>setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e)=>setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">

//             Login

//           </button>

//         </form>

//         <p>

//           New user?

//           <Link to="/signup"> Create Account</Link>

//         </p>

//       </div>

//     </div>

//   );
// }

// export default Login;


import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label htmlFor="password">Password</label>
              <a href="#forgot" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;