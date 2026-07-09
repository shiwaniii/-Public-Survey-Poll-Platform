import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import Signup from "./pages/signupPage";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Login />} />
        
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />




      </Routes>
    
</>




  );
  
}


export default App;

