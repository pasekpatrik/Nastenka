import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { HiAcademicCap, HiUser } from 'react-icons/hi2'

import { getCurrentTime } from '../../modules/module'

import './NavBar.css'
import logo from '../../assets/logo.png'

const NavBar = () => {
    const [now, setNow] = useState(getCurrentTime)

    useEffect(() => {
        const interval = setInterval(() => setNow(getCurrentTime), 1000)

        return () => clearInterval(interval)
    }, [now])

    return (
        <>
            <nav>
                <img src={logo} id='logo' />
                <div id='container-nav-links'>
                    <NavLink to='/' className='link'>
                        <HiAcademicCap />
                        <span>Rozvrh&nbsp;tříd</span>
                    </NavLink>
                    {/* <NavLink to='scheduleteacher' className='link'>
                        <HiBookOpen />
                        <span>Rozvrh&nbsp;učitel</span>
                    </NavLink> */}
                    <NavLink to='substitution' className='link'>
                        <HiUser />
                        <span>Suplování</span>
                    </NavLink>
                </div>
                <div id='time'>{`${now.hours}:${now.minutes}:${now.seconds}`}</div>
            </nav>
        </>
    )
}

export default NavBar