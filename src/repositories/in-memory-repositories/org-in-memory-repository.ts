import { OrgRepository } from '@/repositories/org-repository'
import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/binary'
import { randomUUID } from 'crypto'
import OrganizationNotFoundError from '@/usecases/errors/organization-not-found-error'
import { _ } from 'vitest/dist/chunks/reporters.d.BFLkQcL6'

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

  findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return Promise.resolve(null)
    }

    return Promise.resolve(org)
  }
}
