import OrgRepository, {
  findNearbyOrgsParams,
} from '@/repositories/org-repository'
import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/binary'
import { randomUUID } from 'crypto'
import { getDistance } from 'geolib'

export default class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org: Org = {
      id: data.id || randomUUID(),
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

  listByTown(state: string, city?: string): Promise<Org[]> {
    const orgs = this.orgs.filter((org) => org.state === state)

    if (city) {
      return Promise.resolve(orgs.filter((org) => org.city === city))
    }

    return Promise.resolve(orgs)
  }

  findNearbyOrgs(params: findNearbyOrgsParams): Promise<Org[]> {
    const distance = (orgLatitude: number, orgLongitude: number): number => {
      return getDistance(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: orgLatitude,
          longitude: orgLongitude,
        }
      )
    }
    const filteredOrgs = this.orgs.filter(
      (org) =>
        distance(org.latitude.toNumber(), org.longitude.toNumber()) <= 10000
    )

    return Promise.resolve(filteredOrgs)
  }
}
