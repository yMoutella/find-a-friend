import { beforeEach, describe, expect, it } from 'vitest'
import InMemoryOrgRepository from '@/repositories/in-memory-repositories/org-in-memory-repository'
import FindOrgUseCase from './find-org-useCase'
import ResourceNotFoundError from '../errors/resource-not-found-error'
import { hashSync } from 'bcryptjs'

let orgRepository: InMemoryOrgRepository
let sut: FindOrgUseCase

describe('Find org usecase (UNIT)', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new FindOrgUseCase(orgRepository)
  })
  it('Should be able to find an organization', async () => {
    const hashedPassword = await hashSync('securepassword', 6)
    await orgRepository.create({
      id: 'org-sp',
      name: 'Org SP',
      author_name: 'Org SP',
      email: 'org-sp@example.com',
      whatsapp: '123456789',
      password: hashedPassword,
      cep: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Rua das Flores',
      latitude: -23.5505,
      longitude: -46.6333,
    })
    const { org } = await sut.execute({ id: 'org-sp' })

    expect(org).toEqual(expect.any(Object))
    expect(org.id).toEqual('org-sp')
  })

  it('Should not be able to find an organization', async () => {
    await expect(async () => {
      await sut.execute({ id: 'org-sp' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
