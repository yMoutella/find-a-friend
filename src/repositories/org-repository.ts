import { Org, Prisma } from '@prisma/client'

export interface findNearbyOrgsParams {
  latitude: number
  longitude: number
}

export default interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  listByTown(state: string, city?: string): Promise<Org[]>
  findNearbyOrgs(params: findNearbyOrgsParams): Promise<Org[]>
}
