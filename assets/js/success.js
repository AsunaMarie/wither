const getSuccessElement = () => {
    return document.getElementById("success")
}

const getSuccessTitleElement = () => {
    return document.getElementById("success-title")
}

const getSuccessContentElement = () => {
    return document.getElementById("success-content")
}

const setSuccessTitle = (title) => {
    getSuccessTitleElement().textContent = title
}

const setSuccessContent = (content) => {
    getSuccessContentElement().textContent = content
}

const setSuccess = (title, content) => {
    setSuccessTitle(title)
    setSuccessContent(content)
}

const showSuccess = () => {
    getSuccessElement().classList.remove("hidden")
}

const hideSuccess = () => {
    getSuccessElement().classList.add("hidden")
}