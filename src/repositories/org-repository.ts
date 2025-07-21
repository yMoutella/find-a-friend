import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
