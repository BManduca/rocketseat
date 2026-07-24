import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    console.log(request.headers)
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token.')
      }
    }

    // a orgganização é identificada via slug
    request.getUserMembership = async (slug: string) => {
      // id do usurio logado
      const userId = await request.getCurrentUserId()

      // buscando o usuario na tabela de membros
      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(`You're not a member of this organization!`)
      }

      const { organization, ...membership } = member

      return {
        organization,
        membership,
      }
    }
  })
})

// contexto
