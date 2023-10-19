import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { throwNotUniqueError } from '@Source/utils/error'
import { generateUsername } from '@Source/utils/utils'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /user
   *  Creates a user and profile
   *  @param {string} name
   *  @returns {object} user
   */
  fastify.post('/user', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const username = await generateUsername(token)

    const user = await prisma.user.create({
      data: {
        id: extractId(token),
        profile: {
          create: {
            name: username,
            reputation: 69,
          },
        },
      },
    })
    return user
  })

  /*
   *  GET /user
   *  Returns the current user
   *  @returns {object} user
   */
  fastify.get('/profile', async (req) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
    })
    return profile
  })

  /*
   *  GET /profile/:name
   *  Returns the user's profile by name
   *  @param {string} name
   *  @returns {object} profile
   */
  fastify.get('/profile/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        name: name,
      },
    })
    return profile
  })

  /*
   *  PUT /profile/name
   *  Updates the user's name
   *  @param {string} name
   *  @returns {object} profile
   */
  fastify.put('/profile/name', async (req: FastifyRequest<{ Body: { name: string } }>) => {
    const token = req.headers['authorization'] as string

    const { name } = req.body
    const prisma = await requestHandler(token)

    const nameExists = await prisma.profile.findFirst({
      where: { name: name },
    })
    if (nameExists) {
      throwNotUniqueError('name')
    }

    const profile = await prisma.profile.update({
      where: {
        id: extractId(token),
      },
      data: {
        name: name,
      },
    })
    return profile
  })

  /*
   *  PUT /profile/description
   *  Updates the user's description
   *  @param {string} description
   *  @returns {object} profile
   */
  fastify.put('/profile/description', async (req: FastifyRequest<{ Body: { description: string } }>) => {
    const token = req.headers['authorization'] as string
    const { description } = req.body
    const prisma = await requestHandler(token)

    const changedDescription = await prisma.profile.updateMany({
      data: {
        description: description,
      },
    })
    return changedDescription
  })

  /*
   *  PUT /profile/image
   *  Updates the user's image url
   *  @param {string} image url
   *  @returns {object} profile
   */
  fastify.put('/profile/image', async (req: FastifyRequest<{ Body: { image: string } }>) => {
    const token = req.headers['authorization'] as string

    const { image } = req.body
    const prisma = await requestHandler(token)

    const changedImage = await prisma.profile.updateMany({
      data: {
        image: image,
      },
    })
    return changedImage
  })

  //fastify.setErrorHandler((error, request, reply) => {})
}
