import { beforeEach, describe, expect, it } from 'vitest'

import PetRepository from '@/repositories/pet-repository'
import OrgRepository from '@/repositories/org-repository'
import ListPetUseCase from './search-pet-usecase'
import InMemoryPetRepository from '@/repositories/in-memory-repositories/pet-in-memory-repository'
import InMemoryOrgRepository from '@/repositories/in-memory-repositories/org-in-memory-repository'
import createMockOrgSP from '@/utils/create-mock-org-sp'

let orgRepository: OrgRepository
let petRepository: PetRepository
let sut: ListPetUseCase

describe('List Pet Usecase (UNIT)', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new ListPetUseCase(petRepository)
  })

  it('Should be able to retrieve the second page of pets list', async () => {
    await createMockOrgSP(orgRepository)

    for (let i = 1; i <= 24; i++) {
      await petRepository.create({
        name: `Pet ${i}`,
        age: `${i}`,
        size: 'MEDIUM',
        energy_level: 'HIGH',
        environment: 'INDOORS',
        about: `Description for Pet ${i}`,
        org_id: 'org-sp',
      })
    }

    const { pets } = await sut.execute({ page: 2, state: 'SP' })
    expect(pets).toHaveLength(4)
    expect(pets[0].name).toEqual('Pet 21')
  })

  it('Should be able to retrieve the first page of pets list', async () => {
    await createMockOrgSP(orgRepository)
    for (let i = 1; i <= 24; i++) {
      await petRepository.create({
        name: `Pet ${i}`,
        age: `${i}`,
        size: 'MEDIUM',
        energy_level: 'HIGH',
        environment: 'INDOORS',
        about: `Description for Pet ${i}`,
        org_id: 'org-sp',
      })
    }

    const { pets } = await sut.execute({ page: 1, state: 'SP' })
    expect(pets).toHaveLength(20)
    expect(pets[0].name).toEqual('Pet 1')
  })
})
