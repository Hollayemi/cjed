import { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Header"
import { GetInvolvedProvider } from "@/app/components/forms/GetInvolved"

const HomeWrapper = ({ children }: {children: ReactNode}) => {
    return (
        <GetInvolvedProvider>
            <Navbar />
            {children}
            <Footer />
        </GetInvolvedProvider>
    )
}

export default HomeWrapper;
