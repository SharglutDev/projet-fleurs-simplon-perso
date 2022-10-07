import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-info shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          🌸 Société Nature Cueillette Fleurs
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/details">Details</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
