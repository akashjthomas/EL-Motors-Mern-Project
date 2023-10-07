import React from 'react'

function Footer() {
  return (

  <footer id="footer">
    <div className="footer-top">
      <div className="container" >
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-info">
              <h3>El MOTORS LTD.</h3>
              <p>
                A108 Adam Street <br />
                NY 535022, Kochi<br /><br />
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bx bxl-twitter" /></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook" /></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
                <a href="#" className="google-plus"><i className="bx bxl-skype" /></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="bx bx-chevron-right" /> <a href="#">Home</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="/aboutus">About us</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">Services</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">Terms of service</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">Privacy policy</a></li>
            </ul>
          </div>
    
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright <strong><span>El Motors</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        {/* All the links in the footer should remain intact. */}
        {/* You can delete the links only if you purchased the pro version. */}
        {/* Licensing information: https://bootstrapmade.com/license/ */}
        {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/restaurantly-restaurant-template/ */}
      </div>
    </div>
  </footer>
  
  )
}

export default Footer