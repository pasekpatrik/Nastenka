import { defData } from "./defaultData"

export const getCurrentTime = () => {
    const date = new Date()

    return { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() }
}

export const filterSchedule = (parSchedule, setState) => {
    let allDays = [[], [], [], [], []]

    allDays.forEach((oneDay) => {
        for (let i = 0; i < 11; i++) {
            oneDay.push(defData)
        }
    })

    parSchedule.forEach(({ DayIndex, HourIndex, Atoms }) => allDays[DayIndex].splice(HourIndex - 2, 1, Atoms))

    setState(allDays)
}

export const filterAbbrev = (id, abbrevs, setState) => {
    const result = abbrevs.filter((oneClass) => {
        return oneClass.ID === id
    })

    setState({ id: id, abbrev: result[0].Abbrev })
}