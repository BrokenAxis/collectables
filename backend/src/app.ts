import Fastify, { FastifyServerOptions } from 'fastify'
import { validateUser } from '@Source/utils/supabaseUtils'
import { InvalidIdError } from '@Source/utils/error'
import cors from '@fastify/cors'

import chatRoute from '@Source/routes/chat'
import inventoryRoute from '@Source/routes/inventory'
import profileRoute from '@Source/routes/profile'
import waresRoute from '@Source/routes/wares'
import wishlistRoute from '@Source/routes/wishlist'
import tradeRoute from '@Source/routes/trade'
import collectableRoute from '@Source/routes/collectable'
import collectionRoute from '@Source/routes/collection'
import campaignRoute from '@Source/routes/campaign'
import managerRoute from '@Source/routes/manager'
import imageRoute from '@Source/routes/image'
import searchRoute from '@Source/routes/search'
import achievementRoute from '@Source/routes/achievement'
import forumRoute from '@Source/routes/forum'

export const build = async (opt: FastifyServerOptions) => {
  const fastify = Fastify(opt)

  fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Update-Type', 'X-Requested-With', 'Accept'],
  })

  fastify.register(chatRoute)
  fastify.register(inventoryRoute)
  fastify.register(profileRoute)
  fastify.register(waresRoute)
  fastify.register(wishlistRoute)
  fastify.register(tradeRoute)
  fastify.register(collectableRoute)
  fastify.register(collectionRoute)
  fastify.register(campaignRoute)
  fastify.register(managerRoute)
  fastify.register(imageRoute)
  fastify.register(searchRoute)
  fastify.register(achievementRoute)
  fastify.register(forumRoute)

  // checks if user is authenticated before every request
  // handlers are guaranteed to be given a valid user
  fastify.addHook('onRequest', async (request) => {
    const token = request.headers['authorization']

    if (!token) {
      throw new InvalidIdError()
    }

    const isValid = await validateUser(token)

    if (!isValid) {
      throw new InvalidIdError()
    }
  })

  // see utils/error.ts for custom error handling
  fastify.setErrorHandler(async (error, request, reply) => {
    console.log(error)
    error.statusCode
      ? reply.status(error.statusCode).send({ name: error.name, message: error.message, statusCode: error.code })
      : reply.status(500).send({ name: error.name, message: error.message, statusCode: error.code })
  })

  return fastify
}
