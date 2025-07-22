import { beforeEach, describe, expect, it } from 'vitest'
import InMemoryOrgRepository from '@/repositories/in-memory-repositories/org-in-memory-repository'
import OrgRepository from '@/repositories/org-repository'
import createMockOrgSP from '@/utils/create-mock-org-sp'
import LoginAsOrgUseCase from './login-as-org-useCase'
import InvalidCredentialsError from '../errors/invalid-credentials-error'

let orgRepository: OrgRepository
let sut: LoginAsOrgUseCase

describe('Login as org (UNIT)', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new LoginAsOrgUseCase(orgRepository)
  })
  it('Should be able to login as org', async () => {
    await createMockOrgSP(orgRepository)
    const { org } = await sut.execute({
      id: 'org-sp',
      password: 'securepassword',
    })

    expect(org).toEqual(expect.any(Object))
    expect(org.id).toEqual('org-sp')
    expect(org.name).toEqual('Org SP')
  })

  it('Should return an invalid credentials error', async () => {
    await createMockOrgSP(orgRepository)
    await expect(async () => {
      await sut.execute({ id: 'org-sp', password: 'wrongpassword' })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
