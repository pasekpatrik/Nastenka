import { useState, useEffect } from 'react'
import { fetchRooms, fetchTimetablePar, fetchSchudleRoom, fetchPermanetScheduleRoom } from '../../modules/api'
import { defData, defStateData } from './defaultData'

import SidePanel from '../../components/SidePanel/SidePanel'
import Loader from '../../components/Loader/Loader'

import './ScheduleRoom.css'

const ScheduleRoom = () => {
    const [loader, setLoader] = useState(true)
    const [isScheduleActual, setIsScheduleActual] = useState(true)
    const [room, setRoom] = useState({ room: '', id: '' })

    const [rooms, setRooms] = useState([])
    const [timetablePar, setTimetablePar] = useState([])
    const [schedule, setSchedule] = useState(defStateData)

    const filterScheduleRoom = (paramSchedule) => {
        let allDays = [[], [], [], [], []]

        allDays.forEach((oneDay) => {
            for (let i = 0; i < 11; i++) {
                oneDay.push(defData)
            }
        })

        paramSchedule.forEach(({ DayIndex, HourIndex, Atoms }) => {
            if (DayIndex === 0) {
                allDays[DayIndex].splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 1) {
                allDays[DayIndex].splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 2) {
                allDays[DayIndex].splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 3) {
                allDays[DayIndex].splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 4) {
                allDays[DayIndex].splice(HourIndex - 2, 1, Atoms)
            }
        })

        setSchedule(allDays)
    }

    const filterNumRoom = (id, rooms) => {
        const result = rooms.filter((oneRoom) => {
            return oneRoom.ID === id
        })

        setRoom({ room: result[0].Abbrev, id: id })
    }

    const filterTimetableParam = (paramTimetable) => {
        let newArray = []

        paramTimetable.forEach((oneParam) => {
            let num = parseInt(oneParam.Caption)

            if (num > -1 && num < 11) {
                newArray.push(oneParam)
            }
        })

        setTimetablePar(newArray)
    }

    const handleScheduleRoom = async (id) => {
        let scheduleData

        if (isScheduleActual) {
            scheduleData = await fetchSchudleRoom(id)
        } else {
            scheduleData = await fetchPermanetScheduleRoom(id, '20240604')
        }

        filterScheduleRoom(scheduleData.Cells)
        filterNumRoom(id, rooms)
    }

    useEffect(() => {
        const getRoomsAndSchedule = async () => {
            const roomsData = await fetchRooms()
            const id = roomsData.Rooms[1].ID

            const scheduleData = await fetchSchudleRoom(id)

            setRooms(roomsData.Rooms)
            filterScheduleRoom(scheduleData.Cells)
            filterNumRoom(id, roomsData.Rooms)

            setTimeout(() => setLoader(false), 300)
        }

        const getTimetableData = async () => {
            const timetableData = await fetchTimetablePar()

            filterTimetableParam(timetableData.HourDefinitions)
        }

        getTimetableData()
        getRoomsAndSchedule()
    }, [])

    useEffect(() => {
        const effectSchedule = async () => {
            let scheduleData

            if (isScheduleActual) {
                scheduleData = await fetchSchudleRoom(room.id)
            } else {
                scheduleData = await fetchPermanetScheduleRoom(room.id, '20240604')
            }

            filterScheduleRoom(scheduleData.Cells)
        }

        effectSchedule()
    }, [isScheduleActual, room.id])

    return (
        <>
            <SidePanel active={loader}>
                <div className='sidepanel-scheduleroom'>
                    {rooms.map(({ Abbrev, ID, Building }) => {
                        if (Building === '1N') {
                            return (
                                <div key={ID} className={Abbrev === room.room ? 'active-room' : ''} onClick={() => handleScheduleRoom(ID)}>
                                    {Abbrev}
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            </SidePanel>
            <div className='container-schedule'>
                <h1>Místnot: {room.room}</h1>
                <div id='schedule'>
                    <div id='schedule-time'>
                        {
                            timetablePar.map((oneParam) => {
                                return (
                                    <div key={oneParam.Caption} className='one-param'>
                                        <span>{oneParam.Caption}</span>
                                        <span>{`${oneParam.BeginTime} - ${oneParam.EndTime}`}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        ['PO', 'ÚT', 'ST', 'ČT', 'PÁ'].map((oneDay, index) => {
                            return (
                                <>
                                    <h3 key={index}>{oneDay}</h3>
                                    <div className='day-grid' id={oneDay}>
                                        {
                                            schedule[index].map((oneSubject, index) => {
                                                return (
                                                    <div key={index} className='subject'>
                                                        <p>{oneSubject[0].Subject.Abbrev}</p>
                                                        <p>{oneSubject[0].Teacher.Abbrev}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div>
                    <button onClick={() => setIsScheduleActual(true)}>Aktuální rozvrh</button>
                    <button onClick={() => setIsScheduleActual(false)}>Stálý rozvrh</button>
                </div>
            </div>
            <Loader loader={loader} />
        </>
    )
}

export default ScheduleRoom