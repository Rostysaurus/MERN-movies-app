import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Favourites from "./components/Favourites";
import Playlists from "./components/Playlists";
import Login from "./pages/login/Login";
import Navbar from './components/Navbar'
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.scss"
import { Fragment } from "react";

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          { user &&
          <Fragment>
            <Route
              path="/favourites"
              element={<Favourites/>}
            />
            <Route
              path="/playlists"
              element={<Playlists/>}
            />
          </Fragment>}
          <Route
            path="/login"
            element={user ? <Navigate to="/"/> : <Login/>}
            />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
