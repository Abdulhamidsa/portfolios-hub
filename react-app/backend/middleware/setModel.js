export const setModel = (modal) => {
    return (req, res, next) => {
        req.model = modal
        next()
    }
}
