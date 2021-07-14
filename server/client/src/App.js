import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Route } from "react-router-dom";
import Createpost from "./components/Createpost";
import Admin from "./components/Admin";
import HomeProtected from "./components/ProtectedRoute/HomeProtected";
import Protectedroutes from "./components/Potectedroutes";
import { useState, useEffect } from "react";
import Update from "./components/Update";
function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    localStorage.getItem("jwt") ? setIsAuth(true) : setIsAuth(false);
  }, [isAuth]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route exact path="/createpost">
          <Createpost />
        </Route> */}
        <Route exact path="/admin">
          <Admin />
        </Route>
        {/* <Route exact path="/admin/home">
          <HomeProtected />
        </Route> */}
        <Protectedroutes
          path="/createpost"
          component={Createpost}
          isAuth={isAuth}
        />
        <Protectedroutes
          path="/admin/updatepost/:id"
          component={Update}
          isAuth={isAuth}
        />
        <Protectedroutes
          path="/admin/home"
          component={HomeProtected}
          isAuth={isAuth}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
