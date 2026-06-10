export class InvalidParentIdError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidParentIdError'
  }
}
