import { beforeEach, describe, expect, it } from 'vitest'
import InMemoryOrgRepository from '@/repositories/in-memory-repositories/org-in-memory-repository'
import RegisterOrgUseCase from './register-org-usecase'
import OrgRepository from '@/repositories/org-repository'
import { compareSync } from 'bcryptjs'

let registerOrgRepository: OrgRepository
let orgUseCase: RegisterOrgUseCase

describe('Register Org Usecase (UNIT)', () => {
  beforeEach(() => {
    registerOrgRepository = new InMemoryOrgRepository()
    orgUseCase = new RegisterOrgUseCase(registerOrgRepository)
  })
  it('Should be able to register an organization', async () => {
    const { org } = await orgUseCase.execute({
      name: 'Pet Shelter',
      author_name: 'John Doe',
      email: 'john.doe@example.com',
      whatsapp: '123456789',
      password: 'securepassword',
      cep: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Rua das Flores',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const comparePassword = await compareSync('securepassword', org.password)
    expect(comparePassword).toEqual(true)
    expect(org.name).toEqual(expect.any(String))
    expect(org.author_name).toEqual(expect.any(String))
    expect(org.email).toEqual(expect.any(String))
    expect(org.whatsapp).toEqual(expect.any(String))
    expect(org.id).toEqual(expect.any(String))
    expect(org.cep).toEqual(expect.any(String))
    expect(org.state).toEqual(expect.any(String))
    expect(org.city).toEqual(expect.any(String))
    expect(org.neighborhood).toEqual(expect.any(String))
    expect(org.street).toEqual(expect.any(String))
    expect(org.latitude.toString()).toEqual(expect.any(String))
    expect(org.longitude.toString()).toEqual(expect.any(String))
  })
})
