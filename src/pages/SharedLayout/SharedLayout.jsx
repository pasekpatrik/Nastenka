import { Outlet } from "react-router-dom"

import NavBar from "../../components/Navbar/NavBar"

const SharedLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default SharedLayout