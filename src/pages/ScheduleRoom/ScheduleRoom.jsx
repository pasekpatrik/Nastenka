import { useState, useEffect } from "react"
import { fetchRooms, fetchSchudleRoom } from '../../modules/api'
import { defData, defStateData } from "./defaultData"

import SidePanel from "../../components/SidePanel/SidePanel"

import './ScheduleRoom.css'

const ScheduleRoom = () => {
    const [room, setRoom] = useState('')
    const [rooms, setRooms] = useState([])

    const [schedule, setSchedule] = useState(defStateData)

    const filterScheduleRoom = (paramSchedule) => {
        let Monday = [defData, defData, defData, defData, defData, defData, defData, defData, defData, defData, defData]
        let Tuesday = [defData, defData, defData, defData, defData, defData, defData, defData, defData, defData, defData]
        let Wednesday = [defData, defData, defData, defData, defData, defData, defData, defData, defData, defData, defData]
        let Thursday = [defData, defData, defData, defData, defData, defData, defData, defData, defData, defData, defData]
        let Friday = [defData, defData, defData, defData, defData, defData, defData, defData, defData, defData, defData]
        let All = []

        paramSchedule.forEach(({ DayIndex, HourIndex, Atoms }) => {
            if (DayIndex === 0) {
                Monday.splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 1) {
                Tuesday.splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 2) {
                Wednesday.splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 3) {
                Thursday.splice(HourIndex - 2, 1, Atoms)
            } else if (DayIndex === 4) {
                Friday.splice(HourIndex - 2, 1, Atoms)
            }
        })

        All.push(Monday, Tuesday, Wednesday, Thursday, Friday)

        setSchedule(All)
    }

    const filterNumRoom = (id, rooms) => {
        const result = rooms.filter((oneRoom) => {
            return oneRoom.ID === id
        })

        setRoom(result[0].Abbrev)
    }

    const handleScheduleRoom = async (id) => {
        const scheduleData = await fetchSchudleRoom(id)

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
        }

        getRoomsAndSchedule()
    }, [])

    return (
        <>
            <SidePanel>
                <div className='sidepanel-scheduleroom'>
                    {rooms.map(({ Abbrev, ID, Building }) => {
                        if (Building === '1N') {
                            return (
                                <div key={ID} className={Abbrev === room ? 'active-room' : ''} onClick={() => handleScheduleRoom(ID)}>
                                    {Abbrev}
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            </SidePanel>
            <div className='container-schedule'>
                <h1>Místnot: {room}</h1>
                <div id='schedule'>
                    <div id='schedule-time'><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
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
            </div>
        </>
    )
}

export default ScheduleRoom