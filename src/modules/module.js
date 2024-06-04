export const getCurrentTime = () => {
    const date = new Date()
    
    return {hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()}
}