import { defData } from './defaultData'

export const getCurrentTime = () => {
    const date = new Date()

    return { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() }
}

export const scroll = (element, top) => element.scrollTo({ top: top, behavior: 'smooth' })

export const timeFormat = (time) => time.toString().length != 2 ? '0' + time : time

export const filterSchedule = (parSchedule) => {
    let allDays = [[], [], [], [], []]

    allDays.forEach((oneDay) => {
        for (let i = 0; i < 11; i++) {
            oneDay.push(defData)
        }
    })

    parSchedule.forEach(({ DayIndex, HourIndex, Atoms }) => allDays[DayIndex].splice(HourIndex - 2, 1, Atoms))

    return allDays
}

export const filterAbbrev = (id, abbrevs) => {
    const result = abbrevs.filter((oneClass) => {
        return oneClass.ID === id
    })

    return { id: id, abbrev: result[0].Abbrev }
}

export const filterTimetableParam = (paramTimetable) => {
    const result = paramTimetable.filter((oneParam) => {
        let num = parseInt(oneParam.Caption)
        return num > -1 && num < 11
    })

    return result
}