export default class OrganizationNotFoundError extends Error {
  constructor() {
    super('Organization not found')
  }
}
