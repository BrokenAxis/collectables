import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  /*
   * POST /manager
   * Creates a campaign manager user
   */
  fastify.post('/campaign', async () => {
    return
  })

  /*
   * GET /manager
   * Returns all campaign managers
   */
}
