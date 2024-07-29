import { Route, Switch, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// Import your components
import Signup from "./components/Singup";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import AddPost from "./components/AddContact";
import EditContact from "./components/EditContact"
// Import your reducers

import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar";
import UserDash from "./components/userdash/UserDash";




function App() {
  const user = localStorage.getItem("token");

  return (<div>

     <Switch>
       {user && <Route path="/admindasboard" exact component={Home} />}
       <Route path="/" exact component={Landing} />
       <Route path="/userlogin" exact component={UserLogin} />
       <Route path="/usersignup" exact component={UserSignup} />
       <Route path="/userdashboard" exact component={UserDash} />
       <Route path="/signup" exact component={Signup} />
       <Route path="/login" exact component={Login} />
       <Route path="/add" exact component={AddPost} />
   <Route  path="/edit/:id" exact component={EditContact} />
       {/* Redirect to home if the user is logged in but tries to access the login route */}
       <Route path="/login" render={() => (user ? <Redirect to="/admindasboard" /> : <Login />)} />
       <Route path="/admindasboard" render={() => <Redirect to="/login" />} />
     </Switch>
     <ToastContainer/>
  </div>
  
   
  
  
  );
}

export default App;
