import Header from "./Header"
import Footer from "./Footer"
import Message from "../UI/Message"
import EnvInfo from "../UI/EnvInfo"
import "./Layout.css"

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <Message />
      <main>{children}</main>
      <Footer />
      <EnvInfo />
    </div>
  )
}

export default Layout