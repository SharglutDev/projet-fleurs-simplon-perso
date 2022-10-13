import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";
import Error from "./pages/Error";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
