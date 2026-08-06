import { app } from '@/http/app'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

describe('Authenticate with Password (E2E)', () => {
  it('should be able to authenticate with valid email and password', async () => {
    await app.ready()

    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password({ length: 10 })

    // 1. Cadastrar usuário
    await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name,
        email,
        password,
      },
    })

    // 2. Realizar login
    const response = await app.inject({
      method: 'POST',
      url: '/sessions/password',
      payload: {
        email,
        password,
      },
    })

    expect(response.statusCode).toEqual(201)
    expect(response.json()).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with invalid password', async () => {
    await app.ready()

    const email = faker.internet.email()

    await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'User',
        email,
        password: 'correct-password',
      },
    })

    const response = await app.inject({
      method: 'POST',
      url: '/sessions/password',
      payload: {
        email,
        password: 'wrong-password',
      },
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty('message')
  })
})
