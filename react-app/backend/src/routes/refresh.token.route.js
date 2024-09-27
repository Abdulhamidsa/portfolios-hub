import { Router } from 'express'
import { refreshAccessToeken } from 'src/handlers/refresh.token'
const router = Router()

router.get('/refres-token', refreshAccessToeken)
export default router
