import Menu from '../models/Menu'
import { IRepository } from '../interfaces/Repository'

export class MenuRepository implements IRepository<any> {
  async create(data: Partial<any>): Promise<any> {
    const menu = new Menu(data)
    return await menu.save()
  }

  async findByName(name: string): Promise<any | null> {
    return await Menu.findOne({ name })
  }

  async findAll(): Promise<any[]> {
    return await Menu.find()
  }

  async findById(id: string): Promise<any | null> {
    return await Menu.findById(id)
  }

  async delete(id: string): Promise<void> {
    await Menu.findByIdAndDelete(id)
  }
}
