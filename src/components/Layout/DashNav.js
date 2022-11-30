import { NavLink, useNavigate } from "react-router-dom";

export default function DashNav() {
  let navigate = useNavigate();
  function handleClick() {
    sessionStorage.clear();
    return navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand fumu" href="/dashboard"><i className="fa-solid fa-vault"></i>
          THEVAULT
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#654c91",
                      }
                    : { color: "#A683E3" }
                }
              >
                <i className="fa-solid fa-house"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/newaccount"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#654c91",
                      }
                    : { color: "#A683E3" }
                }
              >
               <i className="fa-solid fa-circle-plus"></i> Create account
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/pricing"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#654c91",
                      }
                    : { color: "#A683E3" }
                }
              >
               <i className="fa-solid fa-circle-user"></i> Customer service
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn blueViolet shadowB" onClick={handleClick}>
               <i className="fa-solid fa-right-from-bracket"></i> Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
