import { Request, Response } from 'express'
import { MenuService } from '../services/MenuService'
import { CreateMenuValidator } from '../validators/CreateMenuValidator'
import { DuplicateMenuError } from '../exceptions/DuplicateMenuError'
import { InvalidParentIdError } from '../exceptions/InvalidParentIdError'

interface MenuParams {
  id: string
}

export class MenuController {
  constructor(private readonly service: MenuService) {}

  async create(req: Request, res: Response) {
    const parsedData = CreateMenuValidator.safeParse(req.body ?? {})

    if (!parsedData.success) {
      return res.status(400).json({
        error: parsedData.error.issues,
      })
    }

    try {
      const menu = await this.service.create(parsedData.data)
      return res.status(201).json({ id: menu.id })
    } catch (error) {
      if (error instanceof InvalidParentIdError) {
        return res.status(400).json({ error: error.message })
      }

      if (error instanceof DuplicateMenuError) {
        return res.status(409).json({ error: error.message })
      }

      throw error
    }
  }

  async findAll(req: Request, res: Response) {
    const menus = await this.service.findAll()

    return res.json(menus)
  }

  async findById(req: Request<MenuParams>, res: Response) {
    const { id } = req.params

    const menu = await this.service.findById(id)

    if (!menu) {
      return res.status(404).json({
        error: 'Menu not found',
      })
    }

    return res.json(menu)
  }

  async delete(req: Request<MenuParams>, res: Response) {
    const { id } = req.params

    const menu = await this.service.findById(id)

    if (!menu) {
      return res.status(404).json({
        error: 'Menu not found',
      })
    }

    await this.service.delete(id)

    return res.sendStatus(200)
  }
}
