import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { trade, tradeSelect } from '@Source/utils/types'

export default async function (fastify: FastifyInstance) {
  /*
   * GET /trade
   * returns all trades of a user
   * @param {string} query
   * @returns {object} trades
   */
  fastify.get('/trade', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    return await prisma.trade.findMany({
      where: {
        OR: [{ buyerId: extractId(token) }, { sellerId: extractId(token) }],
      },
      select: tradeSelect,
    })
  })

  /*
   * GET /trade/:id
   * returns a trade by id
   * @param {string} id
   * @returns {object} trade
   */
  fastify.get('/trade/:id', async (req: FastifyRequest<{ Params: { id: number } }>) => {
    const token = req.headers['authorization'] as string
    const { id } = req.params
    const prisma = await requestHandler(token)
    return await prisma.trade.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: tradeSelect,
    })
  })

  /*
   * GET /trade/pending
   * returns all pending trades of a user
   * @returns {object} trades
   */
  fastify.get('/trade/pending', async (req) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    return await prisma.trade.findMany({
      where: {
        OR: [{ buyerId: extractId(token) }, { sellerId: extractId(token) }],
        status: 'PENDING',
      },
      select: tradeSelect,
    })
  })

  /*
   * POST /trade
   * creates a trade
   * @param {string} buyerId
   * @param {string} sellerId
   * @param {string} collectable
   * @param {number} price
   * @returns {object} trade
   */
  fastify.post(
    '/trade',
    async (
      req: FastifyRequest<{ Body: { buyerId: string; sellerId: string; collectableName: string; price: number } }>
    ) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)
      const { buyerId, sellerId, collectableName, price } = req.body
      return await prisma.trade.create({
        data: {
          buyerId: buyerId,
          sellerId: sellerId,
          collectableName: collectableName,
          price: price,
        },
        select: tradeSelect,
      })
    }
  )
  /*
   * PUT /trade/status/:id
   * updates a trade's status by id
   * @param {string} id
   * @param {string} status
   * @returns {object} trade
   */
  fastify.put(
    '/trade/status/:id',
    async (req: FastifyRequest<{ Params: { id: number }; Body: { status: trade['status'] } }>) => {
      const token = req.headers['authorization'] as string
      const { id } = req.params
      const { status } = req.body
      const prisma = await requestHandler(token)
      return await prisma.trade.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
        select: tradeSelect,
      })
    }
  )

  /*
   * PUT /trade/collectable/:id
   * updates a trade's collectable by id
   * @param {string} id
   * @param {string} collectableId
   * @returns {object} trade
   */
  fastify.put(
    '/trade/collectable/:id',
    async (req: FastifyRequest<{ Params: { id: number }; Body: { collectableName: string } }>) => {
      const token = req.headers['authorization'] as string
      const { id } = req.params
      const { collectableName } = req.body
      const prisma = await requestHandler(token)
      return await prisma.trade.update({
        where: {
          id: id,
        },
        data: {
          collectableName: collectableName,
        },
        select: tradeSelect,
      })
    }
  )

  /*
   * PUT /trade/price/:id
   * updates a trade's price by id
   * @param {string} id
   * @param {number} price
   * @returns {object} trade
   */
  fastify.put('/trade/price/:id', async (req: FastifyRequest<{ Params: { id: number }; Body: { price: number } }>) => {
    const token = req.headers['authorization'] as string
    const { id } = req.params
    const { price } = req.body
    const prisma = await requestHandler(token)
    return await prisma.trade.update({
      where: {
        id: id,
      },
      data: {
        price: price,
      },
      select: tradeSelect,
    })
  })
}
