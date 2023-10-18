import { build } from '@Source/app'
import { prismaMockInstance } from '@Test/__mocks__/utils/PrismaHandler'

describe('Chat', () => {
  it('should return 200', async () => {
    prismaMockInstance.chat.findMany.mockResolvedValueOnce([
      // @ts-expect-error findMany generates type based on query so it will error
      { id: 1, users: [{ sender: 1 }] },
    ])
    prismaMockInstance.message.findMany.mockResolvedValueOnce([
      {
        id: 1,
        chatId: 1,
        senderId: 'sender',
        receiverId: 'receiver',
        content: 'Hello',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const app = await build({})
    const response = await app.inject({
      method: 'GET',
      url: '/chats',
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    })

    expect(response.statusCode).toBe(200)
    // Should also test response body here
  })
})
