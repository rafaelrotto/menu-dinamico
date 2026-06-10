import { MenuRepository } from '../repositories/MenuRepository'
import { IService } from '../interfaces/Service'
import { isValidObjectId } from 'mongoose'
import { DuplicateMenuError } from '../exceptions/DuplicateMenuError'
import { InvalidParentIdError } from '../exceptions/InvalidParentIdError'

export class MenuService implements IService<any> {
  constructor(private readonly repository: MenuRepository) {}

  async create(data: Partial<any>): Promise<any> {
    const name = typeof data.name === 'string' ? data.name.trim() : data.name

    if (typeof name === 'string') {
      const menuExists = await this.repository.findByName(name)

      if (menuExists) {
        throw new DuplicateMenuError('A menu with this name already exists')
      }

      data.name = name
    }

    const parentId =
      typeof data.parentId === 'string' ? data.parentId.trim() : data.parentId

    if (parentId !== undefined && parentId !== null) {
      if (parentId === '' || !isValidObjectId(parentId)) {
        throw new InvalidParentIdError('parentId has invalid format')
      }

      const parentMenu = await this.repository.findById(parentId)

      if (!parentMenu) {
        throw new InvalidParentIdError('parentId does not match any menu')
      }

      data.parentId = parentId
    }

    try {
      return await this.repository.create(data)
    } catch (error) {
      const duplicateName =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: number }).code === 11000 &&
        'keyPattern' in error &&
        !!(error as { keyPattern?: Record<string, number> }).keyPattern?.name

      if (duplicateName) {
        throw new DuplicateMenuError('A menu with this name already exists')
      }

      throw error
    }
  }

  async findAll(): Promise<any[]> {
    const items = await this.repository.findAll()

    return this.buildTree(items)
  }

  async findById(id: string): Promise<any | null> {
    return await this.repository.findById(id)
  }

  async delete(id: string): Promise<void> {
    return await this.repository.delete(id)
  }

  private buildTree(items: any[], parentId: string | null = null): any[] {
    return items
      .filter(item => String(item.parentId) === String(parentId))
      .map(item => ({
        id: item._id.toString(),
        name: item.name,
        submenus: this.buildTree(items, item._id.toString()),
      }))
  }
}
