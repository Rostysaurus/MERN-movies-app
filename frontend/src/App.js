import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Favourites from "./components/Favourites";
import Playlists from "./components/Playlists";
import Navbar from './components/Navbar'
import "./index.scss"

function App() {
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
          <Route
            path="/favourites"
            element={<Favourites/>}
          />
          <Route
            path="/playlists"
            element={<Playlists/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
