import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import CreatePlant from "./pages/CreatePlant";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* On utilise notre composant dans notre JSX */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plant/:id" element={<Details />} />
          <Route path="/plant" element={<CreatePlant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
