const getErrorElement = () => {
    return document.getElementById("error")
}

const getErrorTitleElement = () => {
    return document.getElementById("error-title")
}

const getErrorContentElement = () => {
    return document.getElementById("error-content")
}

const setErrorTitle = (title) => {
    getErrorTitleElement().textContent = title
}

const setErrorContent = (content) => {
    getErrorContentElement().textContent = content
}

const setError = (title, content) => {
    setErrorTitle(title)
    setErrorContent(content)
}

const showError = (title, content) => {
    getErrorElement().classList.remove("hidden")
}

const hideError = () => {
    getErrorElement().classList.add("hidden")
}