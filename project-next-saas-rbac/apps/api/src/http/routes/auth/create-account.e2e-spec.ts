import { app } from '@/http/app'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

describe('Create Account (E2E)', () => {
  it('should be able to create a new user account', async () => {
    await app.ready()

    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password({ length: 10 })

    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name,
        email,
        password,
      },
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a user with an existing email', async () => {
    await app.ready()

    const email = faker.internet.email()
    const password = faker.internet.password({ length: 10 })

    // Primeiro cadastro
    await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'First User',
        email,
        password,
      },
    })

    // Tentativa com mesmo e-mail
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'Duplicate User',
        email,
        password,
      },
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty('message')
  })
})
