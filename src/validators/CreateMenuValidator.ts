import { z } from 'zod'

export const CreateMenuValidator = z.object({
  name: z.string().min(1, 'Name is required'),

  parentId: z.string().optional(),
})
