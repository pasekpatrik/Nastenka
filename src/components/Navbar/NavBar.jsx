import { NavLink } from 'react-router-dom'
import { HiAcademicCap } from "react-icons/hi2";

import './NavBar.css'
import logo from '../../assets/logo.png'

const NavBar = () => {
    return (
        <>
            <nav>
                <img src={logo} id='logo' />
                <div id='container-nav-links'>
                    <div className='link'>
                    <HiAcademicCap />
                        <NavLink to='/'>Rozvrh student</NavLink>
                    </div>
                    <div className='link'>
                        <NavLink to='scheduleteacher'>Rozvrh učitel</NavLink>
                    </div>
                    <div className='link'>
                        <NavLink to='substitution'>Suplování</NavLink>
                    </div>
                </div>
                <div id='time'>00:00</div>
            </nav>
        </>
    )
}

export default NavBar