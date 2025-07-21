import { Org } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/binary'
import { randomUUID } from 'crypto'
import { OrgRepository } from '../org-repository'

export default class OrgInMemoryRepository implements OrgRepository {
  private orgs: Org[] = []

  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Decimal(
        typeof data.latitude === 'object'
          ? String((data.latitude as any).toString())
          : data.latitude
      ),
      longitude: new Decimal(
        typeof data.longitude === 'object'
          ? String((data.longitude as any).toString())
          : data.longitude
      ),
    }
    this.orgs.push(org)
    return Promise.resolve(org)
  }
}
