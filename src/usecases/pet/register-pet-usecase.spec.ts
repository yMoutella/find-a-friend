import { beforeEach, describe, expect, it } from 'vitest'
import InMemoryPetRepository from '../../repositories/in-memory-repositories/pet-in-memory-repository'
import RegisterPetUseCase from './register-pet-usecase'
import OrgInMemoryRepository from '../../repositories/in-memory-repositories/org-in-memory-repository'
import { OrgRepository } from '@/repositories/org-repository'
import PetRepository from '@/repositories/pet-repository'

let petRepository: PetRepository
let orgRepository: OrgRepository
let sut: RegisterPetUseCase

describe('Register Pet Usecase (UNIT)', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new OrgInMemoryRepository()
    sut = new RegisterPetUseCase(petRepository, orgRepository)
  })

  it('Should be able to register a pet', async () => {
    const orgCreated = await orgRepository.create({
      name: 'Test org',
      author_name: 'Test Author',
      email: 'test@example.com',
      whatsapp: '123456789',
      password: 'password',
      cep: '12345-678',
      state: 'Test State',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      street: 'Test Street',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const { pet } = await sut.execute({
      name: 'Buddy',
      age: '2',
      about: 'A friendly dog',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: orgCreated.id,
    })

    expect(pet).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(String),
      about: expect.any(String),
      size: expect.any(String),
      energy_level: expect.any(String),
      environment: expect.any(String),
      org_id: expect.any(String),
    })
  })

  it('Should not be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Buddy',
      age: '2',
      about: 'A friendly dog',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: 'mock123',
    })

    expect(pet).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(String),
      about: expect.any(String),
      size: expect.any(String),
      energy_level: expect.any(String),
      environment: expect.any(String),
      org_id: expect.any(String),
    })
  })
})
