import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchRooms, fetchPermanetScheduleRoom, fetchActualSchudleRoom, fetchTimetablePar } from '../../modules/api'
import { initialData } from '../../modules/defaultData'
import { filterSchedule, filterAbbrev, filterTimetableParam, scroll } from '../../modules/module'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

import Schedule from '../../components/Schedule/Schedule'

import './ScheduleRoom.css'

const ScheduleRoom = () => {
    const sidepanelScheduleRoom = useRef(<div></div>)
    const [arrow, setArrow] = useState(true)

    const [loader, setLoader] = useState(true)
    const [timetablePar, setTimetablePar] = useState([])

    const [abberv, setAbbrev] = useState({ id: '', abbrev: '' })
    const [rooms, setRooms] = useState([])

    const [schedule, setSchedule] = useState(initialData)
    const [isScheduleActual, setIsScheduleActual] = useState(true)

    const filterIsScheduleActual = async (id) => isScheduleActual ? await fetchActualSchudleRoom(id) : await fetchPermanetScheduleRoom(id)

    const handleScheduleRoom = async (id) => {
        const scheduleData = await filterIsScheduleActual(id)

        setSchedule(filterSchedule(scheduleData.Cells))
        setAbbrev(filterAbbrev(id, rooms))
    }

    const handleUP = () => {
        scroll(sidepanelScheduleRoom.current, 0)
        setArrow(true)
    }

    const handleDown = () => {
        const element = sidepanelScheduleRoom.current
        scroll(element, element.scrollHeight)

        setArrow(false)
    }

    useEffect(() => {
        const getRoomsAndSchedule = async () => {
            const roomsData = await fetchRooms()
            const id = roomsData.Rooms[1].ID

            const scheduleData = await fetchActualSchudleRoom(id)

            const timetableData = await fetchTimetablePar()

            setTimetablePar(filterTimetableParam(timetableData.HourDefinitions))

            setRooms(roomsData.Rooms)

            setSchedule(filterSchedule(scheduleData.Cells))
            setAbbrev(filterAbbrev(id, roomsData.Rooms))

            setTimeout(() => setLoader(false), 300)
        }

        getRoomsAndSchedule()
    }, [])

    useEffect(() => {
        const effectSchedule = async () => {
            const scheduleData = await filterIsScheduleActual(abberv.id)

            setSchedule(filterSchedule(scheduleData.Cells))
        }

        effectSchedule()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isScheduleActual])

    useEffect(() => {
        console.log(sidepanelScheduleRoom.current.scrollHeight)
    }, [sidepanelScheduleRoom.current.offsetTop])

    return (
        <>
            <Schedule
                type='room'
                schedule={schedule}
                timetable={timetablePar}
                heading={`Místnost ${abberv.abbrev}`}
                isActual={isScheduleActual}
                isActualClick={{ btn1: useCallback(() => setIsScheduleActual(true), []), btn2: useCallback(() => setIsScheduleActual(false), []) }}
                loader={loader}
            >
                <div id='container-sidepanel-scheduleroom'>
                    <IoIosArrowUp onClick={handleUP} className={arrow ? 'arrow' : 'arrow active-arrow'} />
                    <div id='sidepanel-scheduleroom' ref={sidepanelScheduleRoom}>
                        {
                            rooms.map(({ Abbrev, ID, Building }) => {
                                if (Building === '1N') {
                                    return (
                                        <div key={ID} className={Abbrev === abberv.abbrev ? 'active-room' : ''} onClick={() => handleScheduleRoom(ID)}>
                                            {Abbrev}
                                        </div>
                                    )
                                }

                                return null
                            })
                        }
                    </div>
                    <IoIosArrowDown onClick={handleDown} className={arrow ? 'arrow active-arrow' : 'arrow'} />
                </div>
            </Schedule>
        </>
    )
}

export default ScheduleRoom