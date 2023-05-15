const fetchWeatherData = async (latitude, longitude, units, timezone) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&temperature_unit=${units}&timezone=${timezone}`)
    const data = await response.json()
    console.log(data)
    return data
}

let maxTemperaturesFahrenheitData = {}
let maxTemperaturesCelsiusData = {}
let minTemperaturesFahrenheitData = {}
let minTemperaturesCelsiusData = {}
let maxApparentTemperaturesFahrenheitData = {}
let maxApparentTemperaturesCelsiusData = {}
let minApparentTemperaturesFahrenheitData = {}
let minApparentTemperaturesCelsiusData = {}
let sunrisesData = {}
let sunsetsData = {}
let precipitationsSumsData = {}
const updateWeatherData = async (latitude, longitude, units, timezone) => {
    await fetchWeatherData(latitude, longitude, units, timezone).then((data) => {
        data.daily.time.forEach((day, i) => {
            const sunrise = data.daily.sunrise[i]
            const sunset = data.daily.sunset[i]

            sunrisesData[day] = sunrise.substr(sunrise.indexOf("T") + 1)
            sunsetsData[day] = sunset.substr(sunset.indexOf("T") + 1)

            precipitationsSumsData[day] = data.daily.precipitation_sum[i]
            if (units == "fahrenheit") {
                // Fahrenheit
                maxTemperaturesFahrenheitData[day] = data.daily.temperature_2m_max[i]
                minTemperaturesFahrenheitData[day] = data.daily.temperature_2m_min[i]

                maxApparentTemperaturesFahrenheitData[day] = data.daily.apparent_temperature_max[i]
                minApparentTemperaturesFahrenheitData[day] = data.daily.apparent_temperature_min[i]
            } else {
                // Celsius
                maxTemperaturesCelsiusData[day] = data.daily.temperature_2m_max[i]
                minTemperaturesCelsiusData[day] = data.daily.temperature_2m_min[i]

                maxApparentTemperaturesCelsiusData[day] = data.daily.apparent_temperature_max[i]
                minApparentTemperaturesCelsiusData[day] = data.daily.apparent_temperature_min[i]
            }
        })
    })
    return "success"
}

const getMaxTemperaturesDataArray = (units) => {
    const maxTemperaturesData = units == 'fahrenheit' ? maxTemperaturesFahrenheitData : maxTemperaturesCelsiusData

    let maxTemperaturesDataArray = []

    for (let temperature in maxTemperaturesData) {
        maxTemperaturesDataArray.push(maxTemperaturesData[temperature])
    }

    return maxTemperaturesDataArray
}

const getMinTemperaturesDataArray = (units) => {
    const minTemperaturesData = units == 'fahrenheit' ?  minTemperaturesFahrenheitData : minTemperaturesCelsiusData

    let minTemperaturesDataArray = []

    for (let temperature in minTemperaturesData) {
        minTemperaturesDataArray.push(minTemperaturesData[temperature])
    }

    return minTemperaturesDataArray
}

const getMaxApparentTemperaturesDataArray = (units) => {
    const maxApparentTemperaturesData = units == 'fahrenheit' ?  maxApparentTemperaturesFahrenheitData : maxApparentTemperaturesCelsiusData

    let maxApparentTemperaturesDataArray = []

    for (let temperature in maxApparentTemperaturesData) {
        maxApparentTemperaturesDataArray.push(maxApparentTemperaturesData[temperature])
    }

    return maxApparentTemperaturesDataArray
}

const getMinApparentTemperaturesDataArray = (units) => {
    const minApparentTemperaturesData = units == 'fahrenheit' ?  minApparentTemperaturesFahrenheitData : minApparentTemperaturesCelsiusData

    let minApparentTemperaturesDataArray = []

    for (let temperature in minApparentTemperaturesData) {
        minApparentTemperaturesDataArray.push(minApparentTemperaturesData[temperature])
    }

    return minApparentTemperaturesDataArray
}

const getTemperaturesLabels = (units) => {
    let temperaturesLabels = []

    const maxTemperaturesData = units == 'fahrenheit' ?  maxTemperaturesFahrenheitData : maxTemperaturesCelsiusData

    for (let temperature in maxTemperaturesData) {
        temperaturesLabels.push(temperature)
    }

    return temperaturesLabels
}

const getPrecipitationsSumsDataArray = () => {
    let precipitationsSumsDataArray = []
    
    for (let precipitations in precipitationsSumsData) {
        precipitationsSumsDataArray.push(precipitationsSumsData[precipitations])
    }

    return precipitationsSumsDataArray
}

const getSunrisesDataArray = () => {
    let sunrisesDataArray = []

    for (let sunrise in sunrisesData) {
        sunrisesDataArray.push(sunrisesData[sunrise])
    }

    return sunrisesDataArray
}

const getSunsetsDataArray = () => {
    let sunsetsDataArray = []

    for (let sunset in sunsetsData) {
        sunsetsDataArray.push(sunsetsData[sunset])
    }

    return sunsetsDataArray
}

const getPrecipitationsSumsLabels = () => {
    let precipitationsSumsLabels = []

    for (let precipitations in precipitationsSumsData) {
        precipitationsSumsLabels.push(precipitations)
    }

    return precipitationsSumsLabels
}

const getSunrisesSunsetsLabels = () => {
    let sunrisesSunsetsLabels = []

    for (let sunrise in sunrisesData) {
        sunrisesSunsetsLabels.push(sunrise)
    }

    return sunrisesSunsetsLabels
}

const getUnits = () => {
    return document.getElementById("units").value
}

const getTemperaturesTable = () => {
    return document.getElementById("temperatures-table-container")
}

const getPrecipitationsSumsTable = () => {
    return document.getElementById("precipitations-table-container")
}

const getSunrisesSunsetsTable = () => {
    return document.getElementById("sunrises-sunsets-table-container")
}

const reloadWeatherData = async () => {
    const longitude = localStorage.getItem("longitude")
    const latitude = localStorage.getItem("latitude")

    const timezone = localStorage.getItem("timezone")

    units = getUnits()
    await updateWeatherData(latitude, longitude, units, timezone)
}

const setPrecipitationsSumsTable = () => {
    const precipitationsSumsTableRowNbr = 1

    const precipitationsSumsTable = getPrecipitationsSumsTable()

    const precipitationsSumsTableElement = document.createElement("table")
    precipitationsSumsTableElement.id = "precipitations-table"

    const precipitationsSumsLabels = getPrecipitationsSumsLabels()

    const precipitationsSums = getPrecipitationsSumsDataArray()

    for (i = 0; i <= precipitationsSumsTableRowNbr; i++) {
        const tr = precipitationsSumsTableElement.insertRow()

        switch (i) {
            case 0:
                const labelTd = tr.insertCell()
                precipitationsSumsLabels.forEach((el) => {
                    const td = tr.insertCell()
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 1:
                const labelTd2 = tr.insertCell()
                labelTd2.appendChild(document.createTextNode("Precipitations Sums"))
                precipitationsSums.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", precipitationsSumsLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
        }
    }

    let existingPrecipitationsSumsTableElement = precipitationsSumsTable.querySelector('#precipitations-table')
    
    if (existingPrecipitationsSumsTableElement) {
        precipitationsSumsTable.replaceChild(precipitationsSumsTableElement, existingPrecipitationsSumsTableElement)
    } else {
        precipitationsSumsTable.appendChild(precipitationsSumsTableElement)
    }
}

const setSunrisesSunsetsTable = () => {
    const sunrisesSunsetsTableRowNbr = 2

    const sunrisesSunsetsTable = getSunrisesSunsetsTable()

    const sunrisesSunsetsTableElement = document.createElement("table")
    sunrisesSunsetsTableElement.id = "sunrises-sunsets-table"

    const sunrisesSunsetsLabels = getSunrisesSunsetsLabels()
    console.log(sunrisesSunsetsLabels)

    const sunrises = getSunrisesDataArray()
    const sunsets = getSunsetsDataArray()

    for (i = 0; i <= sunrisesSunsetsTableRowNbr; i++) {
        const tr = sunrisesSunsetsTableElement.insertRow()

        switch (i) {
            case 0:
                const labelTd = tr.insertCell()
                sunrisesSunsetsLabels.forEach((el) => {
                    const td = tr.insertCell()
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 1:
                const labelTd2 = tr.insertCell()
                labelTd2.appendChild(document.createTextNode("Sunrises"))
                sunrises.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", sunrisesSunsetsLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 2:
                const labelTd3 = tr.insertCell()
                labelTd3.appendChild(document.createTextNode("Sunsets"))
                sunsets.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", sunrisesSunsetsLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
        }
    }

    let existingSunrisesSunsetsTableElement = sunrisesSunsetsTable.querySelector('#temperatures-table')
    
    if (existingSunrisesSunsetsTableElement) {
        sunrisesSunsetsTable.replaceChild(sunrisesSunsetsTableElement, existingSunrisesSunsetsTableElement)
    } else {
        sunrisesSunsetsTable.appendChild(sunrisesSunsetsTableElement)
    }
}

const setTemperaturesTable = () => {
    const temperaturesTableRowNbr = 4

    const temperaturesTable = getTemperaturesTable()

    const temperaturesTableElement = document.createElement("table")
    temperaturesTableElement.id = "temperatures-table"

    const temperaturesLabels = getTemperaturesLabels(units)

    const maxTemperatures = getMaxTemperaturesDataArray(units)
    const minTemperatures = getMinTemperaturesDataArray(units)

    const maxApparentTemperatures = getMaxApparentTemperaturesDataArray(units)
    const minApparentTemperatures = getMinApparentTemperaturesDataArray(units)

    for (i = 0; i <= temperaturesTableRowNbr; i++) {
        const tr = temperaturesTableElement.insertRow()

        switch (i) {
            case 0:
                const labelTd = tr.insertCell()
                temperaturesLabels.forEach((el) => {
                    const td = tr.insertCell()
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 1:
                const labelTd2 = tr.insertCell()
                labelTd2.appendChild(document.createTextNode("Max"))
                maxTemperatures.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", temperaturesLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 2:
                const labelTd3 = tr.insertCell()
                labelTd3.appendChild(document.createTextNode("Min"))
                minTemperatures.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", temperaturesLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 3:
                const labelTd4 = tr.insertCell()
                labelTd4.appendChild(document.createTextNode("Max Apparent"))
                maxApparentTemperatures.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", temperaturesLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
            case 4:
                const labelTd5 = tr.insertCell()
                labelTd5.appendChild(document.createTextNode("Min Apparent"))
                minApparentTemperatures.forEach((el, index) => {
                    const td = tr.insertCell()
                    td.setAttribute("data-cell", temperaturesLabels[index])
                    td.appendChild(document.createTextNode(el))
                })
                break
        }
    }

    let existingTemperaturesTableElement = temperaturesTable.querySelector('#temperatures-table')
    
    if (existingTemperaturesTableElement) {
        temperaturesTable.replaceChild(temperaturesTableElement, existingTemperaturesTableElement)
    } else {
        temperaturesTable.appendChild(temperaturesTableElement)
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await reloadWeatherData()

    const temperaturesChartCtx = document.getElementById("temperatures-chart")
    const precipitationsSumsChartCtx = document.getElementById("precipitations-chart")

    const temperaturesChartData = {
        labels: getTemperaturesLabels(units),
        datasets: [
            {
                label: 'Min Temperatures',
                data: getMinTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Max Temperatures',
                data: getMaxTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(25, 60, 120)',
                tension: 0.1
            },
            {
                label: 'Min Apparent Temperatures',
                data: getMinApparentTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(0, 192, 0)',
                tension: 0.1
            },
            {
                label: 'Max Apparent Temperatures',
                data: getMaxApparentTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(80, 0, 60)',
                tension: 0.1
            }
        ]
    }
    const precipitationsSumsChartData = {
        labels: getPrecipitationsSumsLabels(),
        datasets: [
            {
                label: "Precipitations Sums",
                data: getPrecipitationsSumsDataArray()
            }
        ]
    }

    const temperaturesChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    const precipitationsSumsChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    const temperaturesChartConfig = {
        type: 'line',
        data: temperaturesChartData,
        options: temperaturesChartOptions
    }
    const precipitationsSumsChartConfig = {
        type: 'bar',
        data: precipitationsSumsChartData,
        options: precipitationsSumsChartOptions
    }

    let temperaturesChart = new Chart(temperaturesChartCtx, temperaturesChartConfig)
    let precipitationsSumsChart = new Chart(precipitationsSumsChartCtx, precipitationsSumsChartConfig)

    const setTemperaturesChart = async () => {
        const longitude = localStorage.getItem("longitude")
        const latitude = localStorage.getItem("latitude")
    
        const timezone = localStorage.getItem("timezone")
    
        await updateWeatherData(latitude, longitude, units, timezone)
        temperaturesChart.data.labels = getTemperaturesLabels(units)
        temperaturesChart.data.datasets = [
            {
                label: 'Min Temperatures',
                data: getMinTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Max Temperatures',
                data: getMaxTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(25, 60, 120)',
                tension: 0.1
            },
            {
                label: 'Min Apparent Temperatures',
                data: getMinApparentTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(0, 192, 0)',
                tension: 0.1
            },
            {
                label: 'Max Apparent Temperatures',
                data: getMaxApparentTemperaturesDataArray(units),
                fill: false,
                borderColor: 'rgb(80, 0, 60)',
                tension: 0.1
            }
        ]
    
        temperaturesChart.update()
    }

    document.getElementById("units").addEventListener("change", async () => {
        units = getUnits()
        await setTemperaturesChart()
        setTemperaturesTable()
    })

    await setTemperaturesChart()
    setTemperaturesTable()
    setPrecipitationsSumsTable()
    setSunrisesSunsetsTable()
})