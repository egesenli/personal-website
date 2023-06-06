import React, { useState } from 'react'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Navbar from './Navbar'
import MobileNav from './MobileNav'

const LayoutWrapper = ({ children }) => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((prevStatus) => !prevStatus)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onToggleNav={onToggleNav} />
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <SectionContainer>
        <main className="flex-grow">{children}</main>
      </SectionContainer>
      <Footer />
    </div>
  )
}

export default LayoutWrapper
