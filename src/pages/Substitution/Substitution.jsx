import { useState, useEffect } from 'react'
import { fetchSubstitution } from '../../modules/api'

import Loader from '../../components/Loader/Loader'

import './Substitution.css'

const Substitution = () => {
    const [loader, setLoader] = useState(true)
    const [substitution, setSubstitution] = useState({ AbsentTeachers: [], ChangesForClasses: [] })

    useEffect(() => {
        const getSubstitution = async () => {
            const substitutionData = await fetchSubstitution('20240613')
            setSubstitution(substitutionData)

            setLoader(false)
        }

        getSubstitution()
    }, [])

    console.log(substitution)

    return (
        <>
            <div>
                <h3>Nepřítomní učitelé</h3>
                {
                    substitution.AbsentTeachers.map((oneTeacher, index) => {

                        return (
                            <div key={index}>
                                <span>{oneTeacher.Entity.Abbrev}</span><br />
                                <span>{oneTeacher.Entity.Name}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div id='substitution'>
                <div id='params'>
                    {
                        ['Třída', 'Hodina', 'Předmět', 'Místnost', 'Učitel'].map((onePar) => {
                            return (
                                <div key={onePar}>
                                    <h3>{onePar}</h3>
                                </div>
                            )
                        })
                    }
                </div>
          
                    {
                        substitution.ChangesForClasses.map((oneClass, index) => {
                            console.log(oneClass)
                            return (
                                <div key={index} className='one-class'>
                                    <h5>{oneClass.Class.Abbrev}</h5>
                                    {
                                        oneClass.ChangedLessons.map((oneLesson, index) => {
                                            console.log(oneLesson.Hour)
                                            return (
                                                <div key={index} className='one-lesson'>
                                                    <span>{oneLesson.Hour}</span>
                                                    <span>{oneLesson.Subject}</span>
                                                    <span>{oneLesson.Room}</span>
                                                    <span>{oneLesson.Teacher}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                
            </div>
            <Loader loader={loader}/>
        </>
    )
}

export default Substitution