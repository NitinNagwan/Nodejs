import React from "react";
import "./css/Navbar.css";

export default function NavBar() {

  const handleLogout = () =>{
    sessionStorage.clear()
    window.location.reload()
  }
  return (
    <>
      <nav className="Navbar">
        <div className="link-section">
          {/* <ul className="navbar-items">
            <li className="nav-item">
              <a href="/" className="">
                Student Info
              </a>
            </li>
          </ul> */}
          <button className="add-btn" onClick={handleLogout}>Logout</button>
        </div>
        {/* <div className="user-detail">
          <a href="#" className="user-name">
            Nitin Nagwan
          </a>
          <img src="images/nitin.jpg"  className="user-image-section" />
        </div> */}
      </nav>
    </>
  );
}
