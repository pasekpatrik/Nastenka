import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SharedLayout from '../pages/SharedLayout/SharedLayout'
import ScheduleClass from '../pages/ScheduleClass/ScheduleClass'
import ScheduleTeacher from '../pages/ScheduleTeacher/ScheduleTeacher'
import ScheduleRoom from '../pages/ScheduleRoom/ScheduleRoom'
import Substitution from '../pages/Substitution/Substitution'

const App = () => {
    useEffect(() =>{
        setTimeout(() => location.replace(location.origin), 300000)
    }, [])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SharedLayout />}>
                        <Route index element={<Substitution />} />
                        <Route path='scheduleclasses' element={<ScheduleClass />} />
                        <Route path='scheduleteachers' element={<ScheduleTeacher />} />
                        <Route path='schedulerooms' element={<ScheduleRoom />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App