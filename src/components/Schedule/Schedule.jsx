import { Popover } from 'antd'
import PropTypes from 'prop-types'

import SidePanel from '../SidePanel/SidePanel'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'
import Content from '../Content/Content'

import './Schedule.css'

const Schedule = ({ type, schedule, timetable, heading, isActual, isActualClick, children, loader }) => {
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
                            timetable.map((oneParam, index) => {
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
                                                                    <Popover
                                                                        key={index}
                                                                        title={subject.Subject.Name}
                                                                        trigger='click'
                                                                        content={(<Content
                                                                            teacher={subject.Teacher.Name}
                                                                            room={subject.Room.Abbrev}
                                                                            group={subject.Group.Abbrev}
                                                                        />)}
                                                                    >
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
                                                    <Popover
                                                        key={index}
                                                        title={oneSubject[0].Subject.Name}
                                                        trigger='click'
                                                        content={(oneSubject[0].Subject.Abbrev && <Content
                                                            teacher={oneSubject[0].Teacher.Name}
                                                            room={oneSubject[0].Room.Abbrev}
                                                            group={oneSubject[0].Group.Abbrev !== 'celá' && oneSubject[0].Group.Abbrev}
                                                        />)}
                                                    >
                                                        <div className='subject'>
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
                    <Button onClick={isActualClick.btn1} active={isActual}>Aktuální rozvrh</Button>
                    <Button onClick={isActualClick.btn2} active={!isActual}>Stálý rozvrh</Button>
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
    isActualClick: PropTypes.object,
    timetable: PropTypes.array,
    children: PropTypes.node,
    loader: PropTypes.bool
}

export default Schedule