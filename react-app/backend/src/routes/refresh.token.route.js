import { Router } from 'express'
import { refreshAccessToeken } from 'util/refresh.token'
const router = Router()

router.get('/refres-token', refreshAccessToeken)
export default router
