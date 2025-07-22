import { Pet, Prisma } from '@prisma/client'

export interface listPetsParams {
  page: number
  state: string
  city?: string
  age?: string
  energy_level?: string
  size?: string
}

export default interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  list(params: listPetsParams): Promise<Pet[]>
}
