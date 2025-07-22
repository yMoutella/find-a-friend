import OrgRepository, {
  findNearbyOrgsParams,
} from '@/repositories/org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import FindNearbyOrgUseCase from './find-nearby-org'
import InMemoryOrgRepository from '@/repositories/in-memory-repositories/org-in-memory-repository'
import createMockOrgSP from '@/utils/create-mock-org-sp'

let orgRepository: OrgRepository
let sut: FindNearbyOrgUseCase

describe('Find Nearby Org Usecase (UNIT)', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new FindNearbyOrgUseCase(orgRepository)
  })

  it('should no nearby organizations given latitude and longitude', async () => {
    createMockOrgSP(orgRepository)

    const params: findNearbyOrgsParams = {
      latitude: 0,
      longitude: 0,
    }

    const { orgs } = await sut.execute(params)

    expect(orgs).toHaveLength(0)
  })

  it('should nearby organizations given latitude and longitude', async () => {
    createMockOrgSP(orgRepository)

    const params: findNearbyOrgsParams = {
      latitude: -23.55,
      longitude: -46.63,
    }

    const { orgs } = await sut.execute(params)

    expect(orgs).toHaveLength(1)
    expect(orgs[0].id).toEqual('org-sp')
  })
})
