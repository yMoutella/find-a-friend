import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import PetRepository, {
  listPetsParams,
  searchByNameParams,
} from '../pet-repository'
import OrgRepository from '../org-repository'

export default class InMemoryPetRepository implements PetRepository {
  constructor(private orgs: OrgRepository) {}

  private pets: Pet[] = []

  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about || '',
      age: data.age,
      size: data.size || 'MEDIUM',
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    }
    this.pets.push(pet)
    return Promise.resolve(pet)
  }

  async list(params: listPetsParams): Promise<Pet[]> {
    const petsByTown = await this.orgs.listByTown(params.state, params.city)
    return Promise.resolve(
      this.pets
        .filter((pet) => petsByTown.some((org) => org.id === pet.org_id))
        .filter((pet) => (params.age ? pet.age === params.age : true))
        .filter((pet) =>
          params.energy_level ? pet.energy_level === params.energy_level : true
        )
        .filter((pet) => (params.size ? pet.size === params.size : true))
        .filter((pet) =>
          params.name
            ? pet.name.toLowerCase().includes(params.name.toLowerCase())
            : true
        )
        .slice((params.page - 1) * 20, params.page * 20)
    )
  }

  findById(petId: string, orgId?: string): Promise<Pet | null> {
    const pet = this.pets.find(
      (pet) => pet.id === petId && (!orgId || pet.org_id === orgId)
    )

    return Promise.resolve(pet || null)
  }

  searchByName({ page, name, orgId }: searchByNameParams): Promise<Pet[]> {
    const pets = this.pets
      .filter((pet) => pet.name.toLowerCase().includes(name.toLowerCase()))
      .filter((pet) => !orgId || pet.org_id === orgId)
    return Promise.resolve(pets.slice((page - 1) * 20, page * 20))
  }
}
