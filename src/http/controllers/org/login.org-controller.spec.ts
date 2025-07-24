import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Login Org Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should login an organization successfully', async () => {
    await request(app.server).post('/org').send({
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
      body: { token },
      statusCode,
      headers,
    } = await request(app.server).post('/org/login').send({
      email: 'john.doe@example.com',
      password: 'securepassword',
    })

    const cookie = headers['set-cookie']

    expect(statusCode).toBe(200)
    expect(token).toEqual(expect.any(String))
    expect(cookie).toBeDefined()
  })
})
