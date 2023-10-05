import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const brain = await prisma.user.create({
    data: {
      id: '4be5aa5e-4245-46e6-84ed-ed2c410e7c83',
      name: 'brain',
      profile: {
        create: {
          description: 'im such a goomba',
          image: 'thisisaurl',
          achievements: {},
          sales: {},
          purchases: {},
          reputation: 0
        },
      },
    }
  })
  const goomba = await prisma.user.create({
    data: {
      id: '4be5aa5e-4245-46e6-84ed-ed2c410e7c82',
      name: 'goomba',
      profile: {
        create: {
          description: 'im such a brain',
          image: 'thisisaurlaswell',
          achievements: {},
          sales: {},
          purchases: {},
          reputation: 69
        },
      },
    }
  })
  console.log({ brain, goomba })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })