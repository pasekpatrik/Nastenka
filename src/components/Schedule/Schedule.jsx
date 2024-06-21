import { useState, useEffect } from 'react'
import { fetchTimetablePar } from '../../modules/api'

import PropTypes from 'prop-types'
import Button from '../Button/Button'

import './Schedule.css'

const Schedule = ({ isActualClick, isActual, schedule, heading }) => {
    const [timetablePar, setTimetablePar] = useState([])

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

    useEffect(() => {
        const getTimetableData = async () => {
            const timetableData = await fetchTimetablePar()

            filterTimetableParam(timetableData.HourDefinitions)
        }

        getTimetableData()
    }, [])

    return (
        <div className='container-schedule'>
            <h1>{heading}</h1>
            <div id='schedule'>
                <div id='schedule-time'>
                    {
                        timetablePar.map((oneParam, index) => {
                            return (
                                <div key={index} className='one-param'>
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
                            <div key={index} className='day-grid'>
                                <h3 className='one-day'>{oneDay}</h3>
                                {
                                    schedule[index].map((oneSubject, index) => {

                                        return (
                                            oneSubject.length >= 2 ?
                                                <div key={index} className='two-subjects'>
                                                    {
                                                        oneSubject.map((subject, index) => {
                                                            return (
                                                                <div key={index} className='one-subject'>
                                                                    <span className='class'>{subject.Class.Abbrev}</span>
                                                                    <span>{subject.Subject.Abbrev}</span>
                                                                    <span>{subject.Teacher.Abbrev}</span>
                                                                    <span>{subject.Group.Abbrev}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div> :
                                                <div key={index} className='subject'>
                                                    <span className='class'>{oneSubject[0].Class.Abbrev}</span>
                                                    <span className=''>{oneSubject[0].Subject.Abbrev}</span>
                                                    <span>{oneSubject[0].Teacher.Abbrev}</span>
                                                    <span>{oneSubject[0].Group.Abbrev}</span>
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className='container-btn'>
                <Button onClick={isActualClick} active={isActual}>Aktuální rozvrh</Button>
                <Button onClick={isActualClick} active={!isActual}>Stálý rozvrh</Button>
            </div>
        </div>
    )
}

Schedule.propTypes = {
    isActualClick: PropTypes.func,
    isActual: PropTypes.bool,
    schedule: PropTypes.array,
    heading: PropTypes.string
}

export default Schedule