import { useState, useEffect } from 'react'
import { fetchTimetablePar } from '../../modules/api'
import { filterTimetableParam } from '../../modules/module'
import { Popover } from 'antd'

import PropTypes from 'prop-types'

import SidePanel from '../SidePanel/SidePanel'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'

import './Schedule.css'

const Schedule = ({ type, schedule, heading, isActual, isActualClick, isLoader, children }) => {
    const [loader, setLoader] = useState(true)
    const [timetablePar, setTimetablePar] = useState([])

    useEffect(() => {
        const getTimetableData = async () => {
            const timetableData = await fetchTimetablePar()

            setTimetablePar(filterTimetableParam(timetableData.HourDefinitions))

            isLoader && setLoader(false)
        }

        getTimetableData()
    }, [isLoader])

    return (
        <>
            <SidePanel active={loader}>
                {children}
            </SidePanel>
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
                                    <h3>{oneDay}</h3>
                                    {
                                        schedule[index].map((oneSubject, index) => {
                                            return (
                                                oneSubject.length >= 2 ?
                                                    <div key={index} className='two-subjects'>
                                                        {
                                                            oneSubject.map((subject, index) => {
                                                                return (
                                                                    <Popover key={index} title='Titulek 2' trigger='click'>
                                                                        <div className='one-subject'>
                                                                            <span>{type === 'class' ? subject.Room.Abbrev : subject.Class.Abbrev}</span>
                                                                            <span>{subject.Subject.Abbrev}</span>
                                                                            <span>{subject.Teacher.Abbrev}</span>
                                                                            <span>{subject.Group.Abbrev}</span>
                                                                        </div>
                                                                    </Popover>
                                                                )
                                                            })
                                                        }
                                                    </div> :
                                                    <Popover title='Titulek' trigger='click'>
                                                        <div key={index} className='subject'>
                                                            <span>{type === 'class' ? oneSubject[0].Room.Abbrev : oneSubject[0].Class.Abbrev}</span>
                                                            <span>{oneSubject[0].Subject.Abbrev}</span>
                                                            <span>{oneSubject[0].Teacher.Abbrev}</span>
                                                            <span>{oneSubject[0].Group.Abbrev}</span>
                                                        </div>
                                                    </Popover>
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
            <Loader loader={loader} />
        </>
    )
}

Schedule.propTypes = {
    type: PropTypes.string,
    schedule: PropTypes.array,
    heading: PropTypes.string,
    isActual: PropTypes.bool,
    isActualClick: PropTypes.func,
    isLoader: PropTypes.bool,
    children: PropTypes.node
}

export default Schedule