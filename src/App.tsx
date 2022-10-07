import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  const message = "Hello World";

  const handleClick = (name: string) => {
    alert(`Bonjour ${name}`);
  };

  const handleClickSansParem = () => {
    alert(`Appel static`);
  };

  return (
    <div>
      <Navbar />
      <p className="color-pink">{message}</p>
      <button className="btn btn-success" onClick={() => handleClick("Joseph")}>
        Test Joseph
      </button>
      <p>Coucou</p>
      <button className="btn btn-primary" onClick={handleClickSansParem}>
        Test
      </button>
    </div>
  );
};

export default App;
