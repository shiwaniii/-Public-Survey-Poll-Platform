import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate=useNavigate();

const logout=()=>{

navigate("/");

}

return(

<div className="container">

<div className="card">

<h1>Dashboard</h1>

<h3>Welcome to Survey Platform</h3>

<button onClick={logout}>

Logout

</button>

</div>

</div>

)

}

export default Dashboard;