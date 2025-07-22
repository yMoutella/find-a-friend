import { Prisma, Pet } from '@prisma/client'
import PetRepository, { listPetsParams } from '../pet-repository'

export default class PrismaPetRepository implements PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    throw new Error('Method not implemented.')
  }
  findById(petId: string, orgId?: string): Promise<Pet | null> {
    throw new Error('Method not implemented.')
  }
  list(params: listPetsParams): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }
}
