import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Navbar from './Navbar'

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SectionContainer>
        <main className="flex-grow">{children}</main>
      </SectionContainer>
      <Footer />
    </div>
  )
}

export default LayoutWrapper
