import React from 'react'
import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <div>
       <div>
  <div id="topbar" className="d-flex align-items-center fixed-top">
    <div className="container d-flex justify-content-center justify-content-md-between">
      <div className="contact-info d-flex align-items-center">
        <i className="bi bi-phone d-flex align-items-center"><span>+1 5589 55488 55</span></i>
        <i className="bi bi-clock d-flex align-items-center ms-4"><span> Mon-Sat: 11AM - 23PM</span></i>
      </div>
      <div className="languages d-none d-md-flex align-items-center">
        <ul>
          <li>En</li>
         
        </ul>
      </div>
    </div>
  </div>
  {/* ======= Header ======= */}
  <header id="header" className="fixed-top d-flex align-items-cente">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
      <h1 className="logo me-auto me-lg-0"><a href="index.html">El Motors</a></h1>
      {/* Uncomment below if you prefer to use an image logo */}
      {/* <a href="index.html" class="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
        <li><Link className="nav-link scrollto active" to="/">Home</Link></li>
      <li><Link className="nav-link scrollto" to="/aboutus">About</Link></li>
      <li><Link className="nav-link scrollto" to="/joinus">Join</Link></li>
        
          <li><Link className="dropdown" to="/GetCars"><span>Explore</span> <i className="bi bi-chevron-down" /></Link>
            {/* <ul>
              <li><a href="#">Sedans</a></li>
              <li className="dropdown"><a href="#">Suvs<span></span> <i className="bi bi-chevron-right" /></a>
                <ul>
                  <li><a href="#">Cross-over</a></li>
                  <li><a href="#">offroad</a></li>
                  <li><a href="#">Sub-compact</a></li>
                  <li><a href="#">Compact</a></li>
                </ul>
              </li>
              <li><a href="#">Sedans</a></li>
                  <li><a href="#">Trucks and Vans</a></li>
                  <li><a href="#">Sports</a></li>
            </ul> */}
          </li>

        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>{/* .navbar */}
      <a href="/register" className="book-a-table-btn scrollto d-none d-lg-flex">Sign Up</a>
    </div>
  </header>{/* End Header */}
  
</div>
    </div>
  )
}

export default Topbar