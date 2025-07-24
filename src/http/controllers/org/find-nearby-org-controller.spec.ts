import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Find Nearby Org Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should find nearby organizations', async () => {
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

    const response = await request(app.server)
      .post('/org/nearby')
      .send({
        latitude: -23.5505,
        longitude: -46.6333,
      })
      .expect(200)

    const {
      body: { orgs },
    } = response

    expect(orgs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: 'Pet Shelter',
          author_name: 'John Doe',
          email: 'john.doe@example.com',
        }),
      ])
    )
  })
})
