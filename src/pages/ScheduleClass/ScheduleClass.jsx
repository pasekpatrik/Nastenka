import { useState, useEffect, useCallback } from 'react'
import { fetchClasses, fetchActualScheduleClasses, fetchPermanetScheduleClasses } from '../../modules/api'
import { initialData } from '../../modules/defaultData'
import { filterSchedule, filterAbbrev } from '../../modules/module'

import Schedule from '../../components/Schedule/Schedule'

import './ScheduleClass.css'

const ScheduleClass = () => {
    const [ready, setReady] = useState(false)

    const [abbrev, setAbbrev] = useState({ id: '', abbrev: '' })
    const [classes, setClasses] = useState([])

    const [schedule, setSchedule] = useState(initialData)
    const [isScheduleActual, setIsScheduleActual] = useState(true)

    const filterIsScheduleActual = async (id) => isScheduleActual ? await fetchActualScheduleClasses(id) : await fetchPermanetScheduleClasses(id)

    const handleScheduleClass = async (id) => {
        const scheduleData = await filterIsScheduleActual(id)

        setSchedule(filterSchedule(scheduleData.Cells))
        setAbbrev(filterAbbrev(id, classes))
    }

    useEffect(() => {
        const getClassesAndSchedule = async () => {
            const classesData = await fetchClasses()
            const id = classesData.Classes[0].ID

            const scheduleData = await fetchActualScheduleClasses(id)

            setClasses(classesData.Classes)

            setSchedule(filterSchedule(scheduleData.Cells))
            setAbbrev(filterAbbrev(id, classesData.Classes))

            setReady(true)
        }

        getClassesAndSchedule()
    }, [])

    useEffect(() => {
        const effectSchedule = async () => {
            const scheduleData = await filterIsScheduleActual(abbrev.id)

            setSchedule(filterSchedule(scheduleData.Cells))
        }

        effectSchedule()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isScheduleActual])

    return (
        <>
            <Schedule
                type='class'
                schedule={schedule}
                heading={`Třída ${abbrev.abbrev}`}
                isActual={isScheduleActual}
                isActualClick={useCallback(() => setIsScheduleActual(!isScheduleActual), [isScheduleActual])}
                isLoader={ready}
            >
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
            </Schedule>
        </>
    )
}

export default ScheduleClass