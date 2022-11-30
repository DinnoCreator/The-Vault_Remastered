import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand fumu" href="/"><i className="fa-solid fa-vault"></i>
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
                to="/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#654c91",
                      }
                    : { color: "#A683E3" }
                }
              >
                <i className="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#654c91",
                      }
                    : { color: "#A683E3" }
                }
              >
               <i className="fa-solid fa-circle-info"></i> About Us
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link fumu dropdown-toggle"
                href="/#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span><i className="fa-solid fa-vault"></i> Banking</span>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <NavLink
                    to="/create"
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#654c91",
                          }
                        : { color: "#A683E3" }
                    }
                  >
                    <i className="fa-solid fa-circle-plus"></i> Create Account
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/online"
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#654c91",
                          }
                        : { color: "#A683E3" }
                    }
                  >
                   <i className="fa-solid fa-wifi"></i> Online Banking
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signuponline"
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#654c91",
                          }
                        : { color: "#A683E3" }
                    }
                  >
                   <i className="fa-solid fa-user-plus"></i> Sign Up
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item fumu" href="#pricing">
                  <i className="fa-solid fa-money-check-dollar"></i> Dollar Account
                  </a>
                </li>
              </ul>
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
                <i className="fa-solid fa-tag"></i> Pricing
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
