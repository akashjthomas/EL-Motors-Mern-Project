import React from 'react'
import Topbar from './Topbar'
//import Mini from './Mini'
import Footer from './Footer'
import Aboutus from './Aboutus'
import Banner from './Banner'

function Home() {
  return (
    <div>
        <Topbar/>
        <Banner/>
        <Aboutus/>
        <Footer/>
    </div>
  )
}

export default Home