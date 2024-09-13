const getSuccessResponse = (data, status) => (res) => {
    res.status(status).json({
        result: true,
        data: data,
    })
}

const getErrorResponse = (data, status) => (res) => {
    res.status(status).json({
        result: false,
        data,
    })
}
export { getSuccessResponse, getErrorResponse }
