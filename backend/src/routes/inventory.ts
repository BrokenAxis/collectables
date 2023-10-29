import { FastifyInstance, FastifyRequest } from 'fastify'
import { extractId, requestHandler } from '@Source/utils/supabaseUtils'
import { collectableCountCreate, collectableCountSelect } from '@Source/utils/types'
import { throwInvalidActionError } from '@Source/utils/error'

export default async function (fastify: FastifyInstance) {
  /*
   *  GET /inventory
   *  Returns the user's inventory
   *  @returns {object} inventory
   */
  fastify.get('/inventory', async (req: FastifyRequest<{ Body: { collectableId: string } }>) => {
    const token = req.headers['authorization'] as string

    const prisma = await requestHandler(token)

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: extractId(token),
      },
      select: { inventory: { select: collectableCountSelect } },
    })
    return profile.inventory
  })

  /*
   *  PUT /inventory
   *  Update the user's inventory
   *  @param {collectableCount[]} collectables
   *  @returns {object} inventory
   */
  fastify.put('/inventory', async (req: FastifyRequest<{ Body: { collectables: collectableCountCreate[] } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const profile = await prisma.profile.update({
      where: { id: extractId(token) },
      data: {
        inventory: {
          create: req.body.collectables,
        },
      },
      select: { inventory: { select: collectableCountSelect } },
    })
    return profile.inventory
  })

  /*
   * PUT /inventory/:collectable
   * Update the user's inventory
   * @param {string} collectable
   * @param {number} count
   * @returns {object} inventory
   */
  fastify.put(
    '/inventory/:collectable',
    async (req: FastifyRequest<{ Params: { collectable: string }; Body: { count: number } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      const collectableCount = await prisma.collectableCount.findFirst({
        where: {
          name: req.params.collectable,
          inventoryId: extractId(token),
        },
      })

      if (!collectableCount) {
        console.log('hi')
        await prisma.collectableCount.create({
          data: {
            name: req.params.collectable,
            count: req.body.count,
            inventoryId: extractId(token),
          },
        })
        return
      }

      prisma.collectableCount.update({
        where: {
          id: collectableCount.id,
        },
        data: {
          count: req.body.count,
        },
      })
      return
    }
  )

  /*
   * DELETE /inventory/:collectable
   * Update the user's inventory
   * @param {string} collectable
   * @returns {object} inventory
   */
  fastify.delete('/inventory/:collectable', async (req: FastifyRequest<{ Params: { collectable: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const collectableCount = await prisma.collectableCount.findFirst({
      where: {
        name: req.params.collectable,
        inventoryId: extractId(token),
      },
    })

    if (!collectableCount) {
      throwInvalidActionError('delete collectable', 'Collectable not found in inventory')
    }

    prisma.collectableCount.delete({
      where: {
        id: collectableCount!.id,
      },
    })
    return
  })
}
