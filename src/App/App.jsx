import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SharedLayout from '../pages/SharedLayout/SharedLayout'
import ScheduleClass from '../pages/ScheduleClass/ScheduleClass'
import ScheduleTeacher from '../pages/ScheduleTeacher/ScheduleTeacher'
import Substitution from '../pages/Substitution/Substitution'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SharedLayout />}>
                        <Route index element={<ScheduleClass />} />
                        <Route path='scheduleteacher' element={<ScheduleTeacher />} />
                        <Route path='substitution' element={<Substitution />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App