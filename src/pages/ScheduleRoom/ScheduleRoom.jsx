import { useState, useEffect, useCallback } from 'react'
import { fetchRooms, fetchPermanetScheduleRoom, fetchActualSchudleRoom } from '../../modules/api'
import { initialData } from '../../modules/defaultData'
import { filterSchedule, filterAbbrev } from '../../modules/module'

import Schedule from '../../components/Schedule/Schedule'
import SidePanel from '../../components/SidePanel/SidePanel'
import Loader from '../../components/Loader/Loader'

import './ScheduleRoom.css'

const ScheduleRoom = () => {
    const [loader, setLoader] = useState(true)

    const [abberv, setAbbrev] = useState({ id: '', abbrev: '' })
    const [rooms, setRooms] = useState([])

    const [schedule, setSchedule] = useState(initialData)
    const [isScheduleActual, setIsScheduleActual] = useState(true)

    const filterIsScheduleActual = async (id) => isScheduleActual ? await fetchActualSchudleRoom(id) : await fetchPermanetScheduleRoom(id)

    const handleScheduleRoom = async (id) => {
        const scheduleData = await filterIsScheduleActual(id)

        filterSchedule(scheduleData.Cells, setSchedule)
        filterAbbrev(id, rooms, setAbbrev)
    }

    useEffect(() => {
        const getRoomsAndSchedule = async () => {
            const roomsData = await fetchRooms()
            const id = roomsData.Rooms[1].ID

            const scheduleData = await fetchActualSchudleRoom(id)

            setRooms(roomsData.Rooms)

            filterSchedule(scheduleData.Cells, setSchedule)
            filterAbbrev(id, roomsData.Rooms, setAbbrev)

            setTimeout(() => setLoader(false), 300)
        }

        getRoomsAndSchedule()
    }, [])

    useEffect(() => {
        const effectSchedule = async () => {
            const scheduleData = await filterIsScheduleActual(abberv.id)

            filterSchedule(scheduleData.Cells, setSchedule)
        }

        effectSchedule()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isScheduleActual])

    return (
        <>
            <SidePanel active={loader}>
                <div id='sidepanel-scheduleroom'>
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
            </SidePanel>
            <Schedule
                schedule={schedule}
                heading={`Místnost ${abberv.abbrev}`}
                isActual={isScheduleActual}
                isActualClick={useCallback(() => setIsScheduleActual(!isScheduleActual), [isScheduleActual])}
            />
            <Loader loader={loader} />
        </>
    )
}

export default ScheduleRoom