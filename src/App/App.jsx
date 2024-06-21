import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SharedLayout from '../pages/SharedLayout/SharedLayout'
import ScheduleRoom from '../pages/ScheduleRoom/ScheduleRoom'
import Substitution from '../pages/Substitution/Substitution'
import ScheduleClass from '../pages/ScheduleClass/ScheduleClass'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SharedLayout />}>
                        <Route index element={<Substitution />} />
                        <Route path='scheduleclasses' element={<ScheduleClass />}/>
                        <Route path='schedulerooms' element={<ScheduleRoom />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App