import { Prisma, Org } from '@prisma/client'
import OrgRepository, { findNearbyOrgsParams } from '../org-repository'
import { prisma } from '@/prisma'

export default class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    return await prisma.org.create({
      data: {
        id: data.id || undefined,
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
        latitude: new Prisma.Decimal(
          typeof data.latitude === 'object'
            ? String((data.latitude as any).toString())
            : data.latitude
        ),
        longitude: new Prisma.Decimal(
          typeof data.longitude === 'object'
            ? String((data.longitude as any).toString())
            : data.longitude
        ),
      },
    })
  }
  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }
  listByTown(state: string, city?: string): Promise<Org[]> {
    return prisma.org.findMany({
      where: {
        state,
        city,
      },
    })
  }
  findNearbyOrgs({
    latitude,
    longitude,
  }: findNearbyOrgsParams): Promise<Org[]> {
    return prisma.$queryRaw<Org[]>`
     SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT 20 
`
  }
}
