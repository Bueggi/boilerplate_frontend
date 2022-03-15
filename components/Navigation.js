import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";
import AuthContext from "../context/authContext";

export const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  // const logout = () => {
  //   fetch(`${process.env.NEXT_PUBLIC_APIURL}/logout`);
  //   dispatch({ type: "LOGOUT" });
  //   window.localStorage.removeItem("user");
  //   router.push("/");
  //   toast.info("Erfolgreich ausgeloggt");
  // };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Expand at md
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {user === null ? (
              <>
                <li className="nav-item">
                  <Link href="/login">
                    <a className="nav-link active" aria-current="page">
                      Login
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register">
                    <a className="nav-link active" aria-current="page">
                      Register
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="#">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={logout}
                  >
                    Logout
                  </a>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdown04"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdown04">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
};
