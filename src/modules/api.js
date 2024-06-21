const auth = btoa('Skola_2489_01:x263521EFF6A')

const fetchData = async (api) => {
    try {
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + auth
            }
        })

        if (!response.ok) {
            throw new Error(response.status)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error(`Nový error: ${error}`)
    }
}

// Hodiny a čas jednotlivých hodin
export const fetchTimetablePar = async () => await fetchData('https://bakalari.oadusni.cz/bakaweb/if/2/timetable/parameters')


//////////////////
// Místnosti
export const fetchRooms = async () => await fetchData('https://bakalari.oadusni.cz/bakaweb/if/2/common/rooms')

// Stálý rozvrh místnosti | čas formát- 20240604
export const fetchPermanetScheduleRoom = async (id) => await fetchData(`https://bakalari.oadusni.cz/bakaweb/if/2/timetable/permanent/room/${id}`)

// Aktuální rozvrh místnosti
export const fetchActualSchudleRoom = async (id) => await fetchData(`https://bakalari.oadusni.cz/bakaweb/if/2/timetable/actual/room/${id}`)


///////////////////
// Třídy
export const fetchClasses = async () => await fetchData('https://bakalari.oadusni.cz/bakaweb/if/2/common/classes')

// Stálý rozvrh třídy
export const fetchPermanetScheduleClasses = async (id) => await fetchData(`https://bakalari.oadusni.cz/bakaweb/if/2/timetable/permanent/class/${id}`)

// Aktualání rozvrh třídy
export const fetchActualScheduleClasses = async (id) => await fetchData(`https://bakalari.oadusni.cz/bakaweb/if/2/timetable/actual/class/${id}`)


//////////////////////
// Suplování | čas formát- 20240604
export const fetchSubstitution = async (time) => await fetchData(`https://bakalari.oadusni.cz/bakaweb/if/2/substitutions/public/${time}`)