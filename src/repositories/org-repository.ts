import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
}
