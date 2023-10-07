import React from 'react'
import About from './About'
import Topbar from './Topbar'


function Aboutus() {
  return (
    <div>
  {/* ======= About Section ======= */}
  <Topbar/>
  <section id="about" className="about">
    <About/>
    <div className="container" data-aos="fade-up">
      <div className="row">
        <div className="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay={100}>
          <div className="about-img">
           <img src="assets/img/about.jpg" alt />

          </div>
        </div>
      </div>
    </div>
  </section>{/* End About Section */}
</div>
  )
}

export default Aboutus