import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler } from '@Source/utils/supabaseUtils'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /achievement
   * Creates an achievement
   * @param {string} name
   * @param {string} description
   * @param {string} image
   */
  fastify.post(
    '/achievement',
    async (
      req: FastifyRequest<{
        Body: {
          name: string
          description: string
          image: string
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { name, description, image } = req.body
      const prisma = await requestHandler(token)

      const achievement = await prisma.achievement.create({
        data: {
          name: name,
          description: description,
          image: image,
        },
      })
      return achievement
    }
  )

  /*
   * GET /achievement
   * Returns all achievements
   * @returns {object} achievements
   */
  fastify.get('/achievement', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const achievements = await prisma.achievement.findMany()
    return achievements
  })

  /*
   * GET /achievement/:name
   * Returns an achievement by name
   * @returns {object} achievement
   */
  fastify.get('/achievement/:achievementName', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params
    const prisma = await requestHandler(token)

    const achievement = await prisma.achievement.findFirstOrThrow({
      where: { name: name },
    })
    return achievement
  })

  /*
   * PUT /achievement/:name
   * Updates an achievement by name
   * @param {string} name
   * @param {string} description
   * @param {string} image
   * @returns {object} achievement
   */
  fastify.put(
    '/achievement/:name',
    async (
      req: FastifyRequest<{
        Params: { name: string }
        Body: {
          description: string
          image: string
        }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { name } = req.params
      const { description, image } = req.body
      const prisma = await requestHandler(token)

      const achievement = await prisma.achievement.update({
        where: {
          name: name,
        },
        data: {
          description: description,
          image: image,
        },
      })
      return achievement
    }
  )

  /*
   * DELETE /achievement/:name
   * Deletes an achievement by name
   * @param {string} name
   * @returns {boolean} success
   */
  fastify.delete('/achievement/:name', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const { name } = req.params

    const prisma = await requestHandler(token)
    const achievement = await prisma.achievement.delete({
      where: {
        name: name,
      },
    })
    return achievement
  })
}
