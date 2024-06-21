import { useState, useEffect, useCallback } from 'react'
import { fetchClasses, fetchActualScheduleClasses, fetchPermanetScheduleClasses } from '../../modules/api'
import { initialData } from '../../modules/defaultData'
import { filterSchedule, filterAbbrev } from '../../modules/module'

import Schedule from '../../components/Schedule/Schedule'
import SidePanel from '../../components/SidePanel/SidePanel'
import Loader from '../../components/Loader/Loader'

import './ScheduleClass.css'

const ScheduleClass = () => {
    const [loader, setLoader] = useState(true)

    const [abbrev, setAbbrev] = useState({ id: '', abbrev: '' })
    const [classes, setClasses] = useState([])

    const [schedule, setSchedule] = useState(initialData)
    const [isScheduleActual, setIsScheduleActual] = useState(true)

    const filterIsScheduleActual = async (id) => isScheduleActual ? await fetchActualScheduleClasses(id) : await fetchPermanetScheduleClasses(id)

    const handleScheduleClass = async (id) => {
        const scheduleData = await filterIsScheduleActual(id)

        filterSchedule(scheduleData.Cells, setSchedule)
        filterAbbrev(id, classes, setAbbrev)
    }

    useEffect(() => {
        const getClassesAndSchedule = async () => {
            const classesData = await fetchClasses()
            const id = classesData.Classes[0].ID

            const scheduleData = await fetchActualScheduleClasses(id)

            setClasses(classesData.Classes)

            filterSchedule(scheduleData.Cells, setSchedule)
            filterAbbrev(id, classesData.Classes, setAbbrev)

            setTimeout(() => setLoader(false), 300)
        }

        getClassesAndSchedule()
    }, [])

    useEffect(() => {
        const effectSchedule = async () => {
            const scheduleData = await filterIsScheduleActual(abbrev.id)

            filterSchedule(scheduleData.Cells, setSchedule)
        }

        effectSchedule()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isScheduleActual])

    return (
        <>
            <SidePanel active={loader}>
                <div id='sidepanel-scheduleClass'>
                    {
                        classes.map(({ ID, Abbrev }) => {
                            if (Abbrev[0] !== '0') {
                                return (
                                    <div key={ID} className={Abbrev === abbrev.abbrev ? 'active-class' : ''} onClick={() => handleScheduleClass(ID)}>
                                        {Abbrev}
                                    </div>
                                )
                            }

                            return null
                        })
                    }
                </div>
            </SidePanel>
            <Schedule
                schedule={schedule}
                heading={`Třída ${abbrev.abbrev}`}
                isActual={isScheduleActual}
                isActualClick={useCallback(() => setIsScheduleActual(!isScheduleActual), [isScheduleActual])}
            />
            <Loader loader={loader} />
        </>
    )
}

export default ScheduleClass