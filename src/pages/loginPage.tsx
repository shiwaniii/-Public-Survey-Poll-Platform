// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";


// // function Login() {

// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState("");

// //   const [password, setPassword] = useState("");

// //   const handleSubmit = (e) => {

// //     e.preventDefault();

// //     const user = JSON.parse(localStorage.getItem(email));

// //     if (user && user.password === password) {

// //       alert("Login Successful!");

// //       navigate("/dashboard");

// //     } else {

// //       alert("Invalid Email or Password");

// //     }
// //   };

// //   return (

// //     <div className="container">

// //       <div className="card">

// //         <h1>Survey & Poll Platform</h1>

// //         <h2>Sign In</h2>

// //         <form onSubmit={handleSubmit}>

// //           <input
// //             type="email"
// //             placeholder="Email"
// //             onChange={(e)=>setEmail(e.target.value)}
// //             required
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             onChange={(e)=>setPassword(e.target.value)}
// //             required
// //           />

// //           <button type="submit">

// //             Login

// //           </button>

// //         </form>

// //         <p>

// //           New user?

// //           <Link to="/signup"> Create Account</Link>

// //         </p>

// //       </div>

// //     </div>

// //   );
// // }

// // export default Login;


// import React, { useState } from "react";
// import "../style/Login.css";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle authentication logic here
//     console.log("Logging in with:", { email, password });
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h2>Welcome Back</h2>
//           <p>Please enter your details to sign in</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <div className="label-wrapper">
//               <label htmlFor="password">Password</label>
//               <a href="#forgot" className="forgot-link">
//                 Forgot password?
//               </a>
//             </div>
//             <div className="password-input-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <div className="form-options">
//             <label className="remember-me">
//               <input type="checkbox" />
//               <span>Remember me for 30 days</span>
//             </label>
//           </div>

//           <button type="submit" className="btn-submit">
//             Sign In
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>
//             Don't have an account? <a href="#signup">Sign up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// async function handleSignup(e:React.ChangeEvent<HTMLFormElement>)
// {
//   e.preventDefault();

//   setMessage("");

//   if (password !== confirmPassword) {
//     setMessage("Passwords do not match ❌");
//     return;
//   }

//   setLoading(true);

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     setMessage(error.message);
//     setLoading(false);
//     return;
//   }

//   // Insert additional user information
//   if (data.user) {
//     const { error: profileError } = await supabase
//       .from("Profile")
//       .insert({
//         id: data.user.id,
//         full_name: name,
     
//         role: "Volunteer",
//       });











// import React, { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";
// import "../style/Login.css";

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     setMessage("");
//     setLoading(true);

//     // Login user
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setMessage(error.message);
//       setLoading(false);
//       return;
//     }

//     // Fetch user profile
//     if (data.user) {
//       const { data: profile, error: profileError } = await supabase
//         .from("Profile")
//         .select("*")
//         .eq("id", data.user.id)
//         .single();

//       if (profileError) {
//         setMessage(profileError.message);
//         setLoading(false);
//         return;
//       }

//       console.log("Logged in User:", data.user);
//       console.log("Profile:", profile);

//       setMessage("Login Successful ✅");

//       // Redirect according to role
//       if (profile.role === "Admin") {
//         navigate("/admin-dashboard");
//       } else if (profile.role === "Volunteer") {
//         navigate("/volunteer-dashboard");
//       } else {
//         navigate("/");
//       }
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h2>Welcome Back</h2>
//           <p>Please enter your details to sign in</p>
//         </div>

//         <form onSubmit={handleLogin} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <div className="label-wrapper">
//               <label htmlFor="password">Password</label>
//               <a href="#forgot" className="forgot-link">
//                 Forgot password?
//               </a>
//             </div>

//             <div className="password-input-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />

//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <div className="form-options">
//             <label className="remember-me">
//               <input type="checkbox" />
//               <span>Remember me for 30 days</span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="btn-submit"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           {message && (
//             <p
//               style={{
//                 marginTop: "10px",
//                 color: message.includes("Successful") ? "green" : "red",
//                 textAlign: "center",
//               }}
//             >
//               {message}
//             </p>
//           )}
//         </form>

//         <div className="login-footer">
//           <p>
//             Don't have an account? <a href="/signup">Sign up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("Profile")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        setMessage(profileError.message);
        setLoading(false);
        return;
      }

      setMessage("Login Successful ✅");

      console.log(profile);

      if (profile.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (profile.role === "Volunteer") {
        navigate("/volunteer-dashboard");
      } else {
        navigate("/");
      }
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">

            <div className="label-wrapper">
              <label>Password</label>

              <a href="/forgot-password" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <div className="password-input-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {message && (
            <p
              style={{
                marginTop: "15px",
                textAlign: "center",
                color: message.includes("Successful") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}

        </form>

        <div className="login-footer">
          <p>
            Don't have an account?
            <a href="/signup"> Sign Up</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
