import React from "react";
import plane from "../Assets/plane.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase";
import { toast } from "react-toastify";

function Header() {
  const Navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logoutHandler = async () => {
    try {
      const isLogout = window.confirm("Are you sure to logged out?");

      if (isLogout) {
        await signOut(auth);
        toast.success("User loggedOut!");
        setUser(null);
      } else {
        return;
      }
    } catch (error) {
      toast.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div id="header">
        <nav class="navbar navbar-expand-lg  mb-5">
          <div class="container-sm-fluid container-md">
            <a class="navbar-brand">
              <div>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img src={plane} className="plane" />
                  <b style={{ color: "black" }}>Collab</b>
                  <b style={{ color: "#F54748" }}>Talk.ai</b>
                </Link>
              </div>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ms-auto">
                {user ? (
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "#F54748",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      textAlign: "center",
                    }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "#F54748",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      textAlign: "center",
                    }}
                    onClick={() => Navigate("/signUp")}
                  >
                    Signup
                  </a>
                )}
                <a
                  class="nav-link"
                  href="#"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#4D4D4D",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "center",
                  }}
                >
                  About
                </a>
                <a
                  class="nav-link"
                  href="#"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#4D4D4D",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "center",
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
