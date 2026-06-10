import { Router } from 'express'
import { MenuRepository } from '../repositories/MenuRepository'
import { MenuService } from '../services/MenuService'
import { MenuController } from '../controllers/MenuController'

const router = Router()

const menuRepository = new MenuRepository()
const menuService = new MenuService(menuRepository)
const menuController = new MenuController(menuService)

router.post('/', menuController.create.bind(menuController))
router.get('/', menuController.findAll.bind(menuController))
router.get('/:id', menuController.findById.bind(menuController))
router.delete('/:id', menuController.delete.bind(menuController))

export { router as menuRoutes }
