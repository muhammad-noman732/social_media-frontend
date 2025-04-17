import { useEffect } from "react";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Routing from "./routing/Routing";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/features/authSlice";

function App() {
      const dispatch = useDispatch();      
      useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token && token !== "null") {
          console.log("Token from localStorage to verify token: ", token);
          dispatch(fetchCurrentUser(token));
        } else {
          console.log("No token found in localStorage");
        }
      }, []);
  
  return (
       <div>
         <Routing/>
       </div>
  );
}

export default App;
