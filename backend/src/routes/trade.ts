import { FastifyInstance, FastifyRequest } from 'fastify'
import { requestHandler, extractId, rawPrisma } from '@Source/utils/supabaseUtils'
import { throwInvalidActionError } from '@Source/utils/error'

export default async function (fastify: FastifyInstance) {
  /*
   * GET /trade
   * returns all sell offer trades of a user
   * @param {string} query
   * @returns {object} trades
   */
  fastify.get('/trade/sell', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const trades = await prisma.trade.findMany({
      where: {
        sellerId: extractId(token),
        status: {
          in: ['PENDING'],
        },
      },
      include: {
        buyer: true,
        seller: true,
        collectable: true,
      },
    })

    return trades
  })

  /*
   * GET /trade
   * returns all sell offer trades of a user
   * @param {string} query
   * @returns {object} trades
   */
  fastify.get('/trade/buy', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const trades = await prisma.trade.findMany({
      where: {
        buyerId: extractId(token),
        status: {
          in: ['PENDING'],
        },
      },
      include: {
        buyer: true,
        seller: true,
        collectable: true,
      },
    })

    return trades
  })

  /*
   * GET /trade
   * returns all sell offer trades of a user
   * @param {string} query
   * @returns {object} trades
   */
  fastify.get('/trade/history', async (req: FastifyRequest) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)

    const trades = await prisma.trade.findMany({
      where: {
        OR: [
          {
            buyerId: extractId(token),
          },
          {
            sellerId: extractId(token),
          },
        ],
        status: {
          in: ['FINISHED', 'DECLINED', 'ACCEPTED'],
        },
      },
      include: {
        buyer: true,
        seller: true,
        collectable: true,
      },
    })

    return trades
  })

  /*
   * GET /trade/:username
   * returns a trade by id
   * @param {string} id
   * @returns {object} trade
   */

  /*
   * GET /trade/pending
   * returns all pending trades of a user
   * @returns {object} trades
   */

  /*
   * POST /trade
   * creates a trade
   * @param {string} buyerId
   * @param {string} sellerId
   * @param {string} collectableId
   * @param {number} price
   * @returns {object} trade
   */
  fastify.post(
    '/trade',
    async (
      req: FastifyRequest<{ Body: { userId: string; collectableId: string; price: string; sellOrBuy: boolean } }>
    ) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      const { userId, collectableId, price, sellOrBuy } = req.body
      const ourUserId = extractId(token)

      if (userId === ourUserId) {
        throwInvalidActionError('trade', 'You cannot trade with yourself')
      }

      const collectableExists = await prisma.collectableCount.findFirst({
        where: {
          name: collectableId,
          inventoryId: sellOrBuy ? ourUserId : userId,
          count: {
            gt: 0,
          },
        },
      })

      if (!collectableExists) {
        throwInvalidActionError('trade', 'Collectable not found in sellers inventory')
      }

      const trade = await prisma.trade.create({
        data: {
          buyer: {
            connect: { id: sellOrBuy ? userId : ourUserId },
          },
          seller: {
            connect: { id: sellOrBuy ? ourUserId : userId },
          },
          collectable: {
            connect: { name: collectableId },
          },
          price: Number.parseInt(price),
          createdAt: new Date(),
        },
        include: {
          buyer: true,
          seller: true,
          collectable: true,
        },
      })

      return trade
    }
  )

  /*
   * PUT /trade/status/:id/:status
   * updates a trade's status by id
   * @param {string} id
   * @param {string} status
   * @returns {object} trade
   */

  fastify.put(
    '/trade/status/:id/:status',
    async (req: FastifyRequest<{ Params: { id: string; status: 'DECLINED' | 'ACCEPTED' | 'FINISHED' } }>) => {
      const token = req.headers['authorization'] as string
      const prisma = await requestHandler(token)

      const { id, status } = req.params
      const ourUserId = extractId(token)

      if (status === 'ACCEPTED') {
        const trade = await prisma.trade.findUniqueOrThrow({
          where: {
            id: Number.parseInt(id),
          },
        })

        const updateTradeConfirmation = await prisma.trade.update({
          where: {
            id: Number.parseInt(id),
          },
          data: {
            buyerConfirmed: trade.buyerId === ourUserId ? true : undefined,
            sellerConfirmed: trade.sellerId === ourUserId ? true : undefined,
          },
        })

        if (!updateTradeConfirmation.buyerConfirmed || !updateTradeConfirmation.sellerConfirmed) {
          return updateTradeConfirmation
        }

        const sellerCollectableCount = await rawPrisma.collectableCount.findFirstOrThrow({
          where: {
            name: trade.collectableName,
            inventoryId: trade.sellerId,
            count: { gte: 1 },
          },
        })

        await rawPrisma.collectableCount.update({
          where: {
            id: sellerCollectableCount.id,
          },
          data: {
            count: {
              decrement: 1,
            },
          },
        })

        const buyerCollectableCount = await rawPrisma.collectableCount.findFirst({
          where: {
            name: trade.collectableName,
            inventoryId: trade.buyerId,
          },
        })

        if (!buyerCollectableCount) {
          await rawPrisma.collectableCount.create({
            data: {
              name: trade.collectableName,
              count: 1,
              inventoryId: trade.buyerId,
            },
          })
        } else {
          await rawPrisma.collectableCount.update({
            where: {
              id: buyerCollectableCount.id,
            },
            data: {
              count: {
                increment: 1,
              },
            },
          })
        }
      }

      const trade = await prisma.trade.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          status: status,
        },
      })

      return trade
    }
  )

  /*
   * GET /trade/:collectableName
   * returns all trades of a collectable
   * @param {string} query
   * @returns {date: unix timestamp, price: int}
   */
  fastify.get('/trade/:collectableName', async (req: FastifyRequest<{ Params: { name: string } }>) => {
    const token = req.headers['authorization'] as string
    const prisma = await requestHandler(token)
    const { name } = req.params

    const trades = await prisma.trade.findMany({
      where: {
        status: {
          in: ['ACCEPTED'],
        },
        collectableName: name,
      },
      include: {
        buyer: true,
        seller: true,
        collectable: true,
      },
    })

    const tradeList = trades.map((trade) => {
      const currentDate: Date = trade.createdAt
      return {
        date: currentDate.getTime(),
        price: trade.price,
      }
    })

    return tradeList
  })

  /*
   * PUT /trade/collectable/:id
   * updates a trade's collectable by id
   * @param {string} id
   * @param {string} collectableId
   * @returns {object} trade
   */

  /*
   * PUT /trade/price/:id
   * updates a trade's price by id
   * @param {string} id
   * @param {number} price
   * @returns {object} trade
   */
}
