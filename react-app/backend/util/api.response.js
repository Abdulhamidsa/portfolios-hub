const getSuccessResponse = (data, message) => {
    return {
        result: true,
        message,
        data,
    }
}

const getErrorResponse = (message) => {
    return {
        result: false,

        message,
    }
}

export { getSuccessResponse, getErrorResponse }
