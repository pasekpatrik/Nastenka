const auth = btoa('Skola_2489_01:x263521EFF6A')

// Místnosti
export const fetchRooms = async () => {
    try {
        const response = await fetch('https://bakalari.oadusni.cz/bakaweb/if/2/common/rooms', {
            method: 'GET',
            headers: {
                'Host': 'https://www.oadusni.cz',
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
        console.error(error)
    }
}

export const getData1 = async () => {
    try {
        const response = await fetch('https://bakalari.oadusni.cz/bakaweb/if/2/timetable/parameters', {
            method: 'GET',
            headers: {
                'Host': 'https://www.oadusni.cz',
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
        console.error(error)
    }
}

// Suplování
export const getData2 = async () => {
    try {
        const response = await fetch('https://bakalari.oadusni.cz/bakaweb/if/2/substitutions/public/20240604', {
            method: 'GET',
            headers: {
                'Host': 'https://www.oadusni.cz',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + auth
            }
        })

        if (!response.ok) {
            throw new Error(response.status)
        }

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }   
}

// Aktuální rozvrh místnosti
export const fetchSchudleRoom = async (ID) => {
    try {
        const response = await fetch(`https://bakalari.oadusni.cz/bakaweb/if/2/timetable/actual/room/${ID}`, {
            method: 'GET',
            headers: {
                'Host': 'https://www.oadusni.cz',
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
        console.error(error)
    }
}

export const getData4 = async () => {
    try {
        const response = await fetch('https://bakalari.oadusni.cz/bakaweb/if/2/timetable/permanent/room/ZU?date=20200115', {
            method: 'GET',
            headers: {
                'Host': 'https://www.oadusni.cz',
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
        console.error(error)
    }
}