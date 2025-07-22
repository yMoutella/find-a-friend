import { Prisma, Pet, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import PetRepository, { listPetsParams } from '../pet-repository'
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
        .slice((params.page - 1) * 20, params.page * 20)
    )
  }
}
