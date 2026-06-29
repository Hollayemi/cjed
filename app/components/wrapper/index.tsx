import { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Header"

const HomeWrapper = ({ children }: {children: ReactNode}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default HomeWrapper;