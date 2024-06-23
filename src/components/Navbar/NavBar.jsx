import { useState, useEffect, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { HiAcademicCap, HiUser, HiBookOpen } from 'react-icons/hi2'
import { MdMeetingRoom } from 'react-icons/md'

import { getCurrentTime } from '../../modules/module'

import './NavBar.css'
import logo from '../../assets/logo.png'

const NavBar = memo(function NavBar() {
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
                        <HiUser />
                        <span>Suplování</span>
                    </NavLink>
                    <NavLink to='scheduleclasses' className='link'>
                        <HiAcademicCap />
                        <span>Rozvrh Tříd</span>
                    </NavLink>
                    <NavLink to='scheduleteachers' className='link'>
                        <HiBookOpen />
                        <span>Rozvrh učitelů</span>
                    </NavLink>
                    <NavLink to='schedulerooms' className='link'>
                        <MdMeetingRoom />
                        <span>Rozvrh místností</span>
                    </NavLink>
                </div>
                <div id='time'>{`${now.hours}:${now.minutes}:${now.seconds}`}</div>
            </nav>
        </>
    )
})

export default NavBar