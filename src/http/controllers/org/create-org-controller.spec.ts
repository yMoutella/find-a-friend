import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Org Cotroller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create an organization successfully', async () => {
    const response = await request(app.server).post('/org').send({
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

    console.log(response.body)

    const {
      body: { org },
    } = response

    expect(org).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        author_name: expect.any(String),
        email: expect.any(String),
        whatsapp: expect.any(String),
        password: expect.any(String),
        cep: expect.any(String),
        state: expect.any(String),
        city: expect.any(String),
        neighborhood: expect.any(String),
        street: expect.any(String),
        latitude: expect.any(String),
        longitude: expect.any(String),
      })
    )
  })
})
