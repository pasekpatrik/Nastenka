import { useState, useEffect, useCallback } from 'react'
import { fetchRooms, fetchPermanetScheduleRoom, fetchActualSchudleRoom } from '../../modules/api'
import { initialData } from '../../modules/defaultData'
import { filterSchedule, filterAbbrev } from '../../modules/module'

import Schedule from '../../components/Schedule/Schedule'

import './ScheduleRoom.css'

const ScheduleRoom = () => {
    const [ready, setReady] = useState(false)

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

    useEffect(() => {
        const getRoomsAndSchedule = async () => {
            const roomsData = await fetchRooms()
            const id = roomsData.Rooms[1].ID

            const scheduleData = await fetchActualSchudleRoom(id)

            setRooms(roomsData.Rooms)

            setSchedule(filterSchedule(scheduleData.Cells))
            setAbbrev(filterAbbrev(id, roomsData.Rooms))

            setReady(true)
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

    return (
        <>
            <Schedule
                type='room'
                schedule={schedule}
                heading={`Místnost ${abberv.abbrev}`}
                isActual={isScheduleActual}
                isActualClick={useCallback(() => setIsScheduleActual(!isScheduleActual), [isScheduleActual])}
                isLoader={ready}
            >
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
            </Schedule>
        </>
    )
}

export default ScheduleRoom