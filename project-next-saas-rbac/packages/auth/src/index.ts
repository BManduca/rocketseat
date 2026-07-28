import {
  AbilityBuilder,
  createMongoAbility,
  type CreateAbility,
  type MongoAbility,
} from '@casl/ability'

import { z } from 'zod'
import type { User } from './models/user'
import { permissions } from './permissions'
import { billingSubject } from './subjects/billing'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'
import { projectSubject } from './subjects/project'
import { userSubject } from './subjects/user'

export * from './models/organization'
export * from './models/project'
export * from './models/user'
export * from './roles'

const appAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  // para teste, imprimindo a role
  console.log('Definindo permissões para a role:', user.role)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found!`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      // orientando o CASL a utilizar o __typename para determinar a subject do
      // objeto que estiver sendo verificado

      return subject.__typename
    },
  })

  // o 'this' dentro da função 'can' será sempre a própria função 'can'
  ability.can = ability.can.bind(ability)
  // o 'this' dentro da função 'cannot' será sempre a própria função 'cannot'
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
