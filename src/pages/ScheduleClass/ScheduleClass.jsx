import { useEffect, useState } from "react"
import { fetchRooms, fetchSchudleRoom } from '../../modules/api'
import { defaultData } from "./defaultData"

import SidePanel from "../../components/SidePanel/SidePanel"

import './ScheduleClass.css'

const ScheduleClass = () => {
    const [rooms, setRooms] = useState([])
    const [schedule, setSchedule] = useState([[], [], [], [], [], [], [], [], [], [], []])

    const getRoomsAndSchedule = async () => {
        const roomsData = await fetchRooms()
        const scheduleData = await fetchSchudleRoom(roomsData.Rooms[1].ID)

        setRooms(roomsData.Rooms)
        filterScheduleRoom(scheduleData.Cells)
    }

    const handleScheduleRoom = async (id) => {
        const data = await fetchSchudleRoom(id)

        setSchedule([[], [], [], [], [], [], [], [], [], [], []])
        filterScheduleRoom(data.Cells)
    }

    const filterScheduleRoom = (paramSchedule = []) => {
        let Monday = [defaultData, defaultData, defaultData, defaultData, defaultData, defaultData, defaultData, defaultData, defaultData, defaultData, defaultData]
        let Tuesday = [[], [], [], [], [], [], [], [], [], [], []]
        let Wednesday = [[], [], [], [], [], [], [], [], [], [], []]
        let Thursday = [[], [], [], [], [], [], [], [], [], [], []]
        let Friday = [[], [], [], [], [], [], [], [], [], [], []]
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

    useEffect(() => {
        getRoomsAndSchedule()
    }, [])

    return (
        <>
            <SidePanel>
                {rooms.map(({ Abbrev, ID, Building }) => {
                    if (Building === '1N') {
                        return (
                            <div key={ID} onClick={() => handleScheduleRoom(ID)}>
                                {Abbrev}
                            </div>
                        )
                    }
                })}
            </SidePanel>
            <div className='container-schedule'>
                <div id='schedule'>
                    <div id='schedule-time'><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
                    <h3>PO</h3>
                    <div id='monday' className='day-grid'>
                        {
                            schedule[0].map((oneSubject, index) => {

                                console.log(oneSubject[0].Teacher.Abbrev)
                                return (
                                    <div key={index} className='subject'>
                                        <p>{oneSubject[0].Subject.Abbrev}</p>
                                        <p>{oneSubject[0].Teacher.Abbrev}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <h3>ÚT</h3>
                    <div id='tuesday' className='day-grid'>
                        
                    </div>
                    <h3>ST</h3>
                    <div id='wednesday' className='day-grid'>
                        
                    </div>
                    <h3>ČT</h3>
                    <div id='wednesday' className='day-grid'>
                        
                    </div>
                    <h3>PÁ</h3>
                    <div id='wednesday' className='day-grid'>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleClass