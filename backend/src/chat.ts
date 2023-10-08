import { requestHandler } from "./utils/PrismaHandler"

async function getChats(token: string | undefined, userId: string | undefined) {
  const prisma = await requestHandler(token as string)
  const chats = await prisma.chat.findMany({
    where:{
      users: {
        some: {
          id: userId
        }
      }
    }
  })
  return chats
}

async function getChat(token: string | undefined, userId: string, receiverId: string) {
  const prisma = await requestHandler(token as string)
  const chat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [userId, receiverId]
          }
        }
      }
    }
  })

  return chat
}

// Creates a new chat between 2 users that have no existing DM between them
async function updateChat(token: string | undefined, userId: string | undefined, receiverId: string | undefined) {
  const prisma = await requestHandler(token as string)
  const newChat = await prisma.chat.create({
    data: {
      users: {
        connect: [
          {
            id: userId,
          },
          {
            id: receiverId,
          },
        ],
      },
    },
  })
  return newChat
}
 
async function sendMessage(token: string | undefined, userId: string, receiverId: string, message: string) {
  const prisma = await requestHandler(token as string)

  const currChat = await prisma.chat.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [userId, receiverId]
          }
        }
      }
    }
  })

  if (!currChat) {
    throw new Error("Chat not found")
  }
  
  const newMessage = await prisma.message.create({
    data: {
      chatId: currChat.id,
      senderId: userId,
      receiverId: receiverId,
      content: message
    }
  })
  
  await prisma.chat.update({
    where: {      
      id: currChat.id
    },
    data: {
      messages: {
        connect: { id: newMessage.id}
      }
    }

  })


  return currChat
}

export {getChats, getChat, updateChat, sendMessage}