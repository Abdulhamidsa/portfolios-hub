const getSuccessResponse = (res, status, data) => {
    res.status(status).json({
        result: true,
        data,
    })
}

const getErrorResponse = (res, status, message) => {
    res.status(status).json({
        result: false,
        message,
    })
}

export { getSuccessResponse, getErrorResponse }
