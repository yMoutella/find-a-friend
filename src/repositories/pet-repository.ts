import { Pet, Prisma } from '@prisma/client'

export interface listPetsParams {
  page: number
  state: string
  city?: string
  age?: string
  energy_level?: string
  size?: string
  name?: string
}

export interface searchByNameParams {
  page: number
  name: string
  orgId?: string
}

export default interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string, orgId?: string): Promise<Pet | null>
  list(params: listPetsParams): Promise<Pet[]>
}
