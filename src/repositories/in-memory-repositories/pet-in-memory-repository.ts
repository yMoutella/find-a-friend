import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import PetRepository from '../pet-repository'

export default class InMemoryPetRepository implements PetRepository {
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
}
