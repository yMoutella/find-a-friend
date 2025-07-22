import PetRepository from '@/repositories/pet-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import GetPetDetailsUseCase from './get-pet-details-usecase'
import InMemoryPetRepository from '@/repositories/in-memory-repositories/pet-in-memory-repository'
import OrgRepository from '@/repositories/org-repository'
import InMemoryOrgRepository from '@/repositories/in-memory-repositories/org-in-memory-repository'
import createMockOrgSP from '@/utils/create-mock-org-sp'
import ResourceNotFoundError from '../errors/resource-not-found-error'

let petRepository: PetRepository
let orgRepository: OrgRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Usecase (UNIT)', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('Should be able to get pet details', async () => {
    await createMockOrgSP(orgRepository)

    await petRepository.create({
      name: 'Buddy V2',
      about: 'Friendly and playful V2',
      age: 'PUPPY V2',
      size: 'SMALL',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: 'org-sp',
    })

    const createdPet = await petRepository.create({
      name: 'Buddy',
      about: 'Friendly and playful',
      age: 'PUPPY',
      size: 'SMALL',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: 'org-sp',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
      orgId: 'org-sp',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual('org-sp')
  })

  it('Should not be able to get pet details', async () => {
    await createMockOrgSP(orgRepository)

    await petRepository.create({
      name: 'Buddy V2',
      about: 'Friendly and playful V2',
      age: 'PUPPY V2',
      size: 'SMALL',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: 'org-sp',
    })

    await petRepository.create({
      name: 'Buddy',
      about: 'Friendly and playful',
      age: 'PUPPY',
      size: 'SMALL',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: 'org-sp',
    })

    await expect(async () => {
      await sut.execute({
        petId: 'mockId',
        orgId: 'org-sp',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
