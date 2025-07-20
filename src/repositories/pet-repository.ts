import { Pet, Prisma } from '@prisma/client'

export default interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
