import { FastifyInstance, FastifyRequest } from 'fastify'
import 'dotenv/config'
import { requestHandler, extractId } from '@Source/utils/supabaseUtils'
import { getUserId } from '@Source/utils/utils'
import { throwInvalidFieldError, throwMissingFieldError } from '@Source/utils/error'

export default async function (fastify: FastifyInstance) {
  /*
   *  POST /chat/:receiverName
   *  Creates a chat between current user and user with receiverName
   *  @returns {object} chat
   */
  fastify.post('/chat/:receiverName', async (req: FastifyRequest<{ Params: { receiverName: string } }>) => {
    const token = req.headers['authorization'] as string
    const { receiverName } = req.params
    return await createChat(token, extractId(token), receiverName)
  })

  /*
   *  GET /chat/:receiverName
   *  Returns a chat between current user and user with receiverName
   *  @returns {object} chat
   */
  fastify.get('/chat/:receiverName', async (req: FastifyRequest<{ Params: { receiverName: string } }>) => {
    const token = req.headers['authorization'] as string
    const { receiverName } = req.params
    return await getMessages(token, extractId(token), receiverName)
  })

  /*
   *  GET /chat
   *  Returns all chats
   *  @returns {object} chats
   */
  fastify.get('/chat', async (req) => {
    const token = req.headers['authorization'] as string
    return await getChats(token, extractId(token))
  })

  /*
   *  PUT /chat/send/:receiverName
   *  Sends a message to user with receiverName
   *  @returns {object} message
   */
  fastify.put(
    '/chat/send/:receiverName',
    async (
      req: FastifyRequest<{
        Params: { receiverName: string }
        Body: { messageContents: string }
      }>
    ) => {
      const token = req.headers['authorization'] as string
      const { receiverName } = req.params
      const { messageContents } = req.body

      if (!messageContents) {
        throwMissingFieldError('messageContents')
      }

      return sendMessage(token, extractId(token), receiverName, messageContents)
    }
  )
}

// helper functions ------------------------------------------------------------

enum MessageType {
  USER,
  RECEIVER,
}

type Message = {
  type: MessageType
  content: string
  timestamp: Date
}

async function getChats(token: string, userId: string) {
  const prisma = await requestHandler(token)
  const chats = await prisma.chat.findMany({
    include: {
      users: true,
      messages: true,
    },
  })

  const latestMessages = []
  for (const chat of chats) {
    const chatMessages = chat.messages
    latestMessages.push(chatMessages[chatMessages.length - 1])
  }

  const formattedChats = [] // refactor this later im pretty sure there's an easier way of doing this
  for (const chat of chats) {
    const receiver = chat.users.at(0)?.id === userId ? chat.users.at(1) : chat.users.at(0)
    formattedChats.push({
      id: chat.id,
      latestMessage: latestMessages[chats.indexOf(chat)],
      receiver: receiver,
      image: receiver?.image,
    })
  }

  return { chats: formattedChats }
}

async function getMessages(token: string, userId: string, receiverName: string) {
  const prisma = await requestHandler(token)

  const receiverId = await getUserId(receiverName, prisma)

  const chat = await prisma.chat.findFirstOrThrow({
    where: {
      users: {
        some: {
          id: receiverId,
        },
      },
    },
    include: { messages: true },
  })

  const formattedMessages: Message[] = chat.messages.map((message) => {
    const type = message.senderId === userId ? MessageType.USER : MessageType.RECEIVER

    return {
      type: type,
      content: message.content,
      timestamp: message.updatedAt,
    }
  })

  return { messages: formattedMessages }
} // Write documentation for this later

// Creates a new chat between 2 users that have no existing DM between them
async function createChat(token: string, userId: string, receiverName: string) {
  const prisma = await requestHandler(token) // fix this
  const receiverId = await getUserId(receiverName, prisma)

  if (userId === receiverId) {
    throwInvalidFieldError('receiver', 'cannot message oneself')
  }

  const sortedIds = [{ id: userId }, { id: receiverId }].sort((a, b) => a.id.localeCompare(b.id))

  const oldChat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [userId, receiverId],
          },
        },
      },
    },
  })

  return oldChat
    ? oldChat
    : await prisma.chat.create({
        data: {
          users: {
            connect: sortedIds,
          },
        },
      })
}

async function sendMessage(token: string, userId: string, receiverName: string, message: string) {
  const prisma = await requestHandler(token as string)
  const receiverId = await getUserId(receiverName, prisma)
  const id = await getChatId(token, receiverId)

  const updateResult = await prisma.chat.update({
    where: { id: id },
    data: {
      messages: {
        create: {
          content: message,
          senderId: userId,
        },
      },
    },
    include: { messages: true },
  })

  return updateResult
}

async function getChatId(token: string, receiverId: string) {
  const prisma = await requestHandler(token)
  const { id: id } = await prisma.chat.findFirstOrThrow({
    where: {
      users: {
        some: { id: receiverId },
      },
    },
  })

  return id
}
