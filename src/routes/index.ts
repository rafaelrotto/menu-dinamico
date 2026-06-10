import { Router } from 'express'
import { menuRoutes } from './menu.routes'

const routes = Router()

routes.use('/api/v1/menu', menuRoutes)

export { routes }
