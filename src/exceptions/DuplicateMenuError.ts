export class DuplicateMenuError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DuplicateMenuError'
  }
}
