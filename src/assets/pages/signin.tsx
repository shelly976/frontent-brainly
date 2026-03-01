import axios from 'axios';
import './../../App.css';
import {useNavigate} from 'react-router-dom';

export  function Signin(){
  const navigate=useNavigate();
   async function signin(){
    const username=document.getElementById("username");
    const password=document.getElementById("password");
         console.log(username.value);
         const response=await axios.post("http://localhost:3000/api/vi/signin",{
            username:username.value,password:password.value
         });
         localStorage.setItem("token", response.data.Token);
         alert("you have signin!");
         navigate('/dashboard');
   }
   return(
  <div className="signup-container">
      <h2>Signin</h2>
      {/* <form > */}
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
        />
        <input
          type="text"
          id="password"
          placeholder="Enter your password"
        />
        <button type="submit" onClick={signin}>Sign In</button>
      {/* </form> */}
    </div>
  );
}