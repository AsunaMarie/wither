window.addEventListener("DOMContentLoaded", () => {
    const getDetectGpsPositionButton = () => {
        return document.getElementById("gps-button")
    }
    
    const getContinueButton = () => {
        return document.getElementById("continue-button")
    }
    
    getDetectGpsPositionButton().addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const longitude = pos.coords.longitude
            const latitude = pos.coords.latitude
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

            hideError()
            setSuccess("Success", `Your position: Longitude: ${longitude} | Latitude: ${latitude}`)
            showSuccess()

            localStorage.setItem("longitude", pos.coords.longitude)
            localStorage.setItem("latitude", pos.coords.latitude)
            localStorage.setItem("timezone", timezone)
        }, () => {
            hideSuccess()
            setError("Error", "Can't access your position.")
            showError()
        })
    })

    getContinueButton().addEventListener("click", () => {
        if (localStorage.getItem("longitude") !== null) {
            window.location.href = "weather.html"
        } else {
            hideSuccess()
            setError("Error", "You didn't set your position.")
            showError()
        }
    })
})