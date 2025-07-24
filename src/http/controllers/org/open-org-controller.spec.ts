import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Open Org Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should open the organization page', async () => {
    const {
      body: { org },
    } = await request(app.server).post('/org').send({
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

    const {
      body: { org: returnedOrg },
      statusCode,
    } = await await request(app.server).get(`/org/${org.id}`)

    expect(statusCode).toBe(200)
    expect(returnedOrg).toEqual(
      expect.objectContaining({
        name: 'Pet Shelter',
        author_name: 'John Doe',
        email: 'john.doe@example.com',
        whatsapp: '123456789',
        password: '',
        cep: '12345-678',
        state: 'SP',
        city: 'São Paulo',
        id: expect.any(String),
        neighborhood: 'Centro',
        street: 'Rua das Flores',
        latitude: '-23.5505',
        longitude: '-46.6333',
      })
    )
  })
})
