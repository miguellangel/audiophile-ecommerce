import Nav from './Nav'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
        <>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
        </>
    )
}

export default Layout