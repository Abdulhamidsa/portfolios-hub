const getSuccessResponse = (data) => {
    return {
        result: true,
        data: data,
    }
}

const getErrorResponse = (error, type) => {
    return {
        result: false,
        error: error,
        message: error || 'Error',
        type: type,
    }
}
export { getSuccessResponse, getErrorResponse }
