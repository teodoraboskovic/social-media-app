import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <ScrollToTop/>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route path="/register">
        {user ? <Redirect to="/"/> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;