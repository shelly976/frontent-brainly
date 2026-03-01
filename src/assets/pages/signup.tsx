import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../App.css';

export  function Signup(){
   const navigate=useNavigate();
   const signup=async ()=>{
    const username=document.getElementById("username");
    const password=document.getElementById("password");
         console.log(username.value);
         await axios.post("http://localhost:3000/api/vi/signup",{
            username:username.value,password:password.value
         });
         alert("you have signup!");
         navigate('/signin');
   }
  
    return (
    <div className="signup-container">
      <h2>Signup</h2>
      {/* <form > */}
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username" />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" placeholder="Password" />

        <button type="submit" onClick={signup}>Sign Up</button>
      {/* </form> */}
    </div>
  );
}