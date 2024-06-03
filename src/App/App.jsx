import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SharedLayout from '../pages/SharedLayout/SharedLayout'
import ScheduleStudent from '../pages/ScheduleStudent/ScheduleStudent'
import ScheduleTeacher from '../pages/ScheduleTeacher/ScheduleTeacher'
import Substitution from '../pages/Substitution/Substitution'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SharedLayout />}>
                        <Route index element={<ScheduleStudent />} />
                        <Route path='scheduleteacher' element={<ScheduleTeacher />} />
                        <Route path='substitution' element={<Substitution />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App