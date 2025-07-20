import { beforeEach, describe, expect, it } from 'vitest'
import InMemoryPetRepository from '../../repositories/in-memory-repositories/pet-in-memory-repository'
import RegisterPetUseCase from './register-pet-usecase'

let inMemoryPetRepository
let registerPetUseCase

describe('Register Pet Usecase (UNIT)', () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    registerPetUseCase = new RegisterPetUseCase(inMemoryPetRepository)
  })

  it('Should be able to register a pet', async () => {
    const { pet } = await registerPetUseCase.execute({
      name: 'Buddy',
      age: '2',
      about: 'A friendly dog',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      environment: 'INDOOR',
      org_id: 'org-123',
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
