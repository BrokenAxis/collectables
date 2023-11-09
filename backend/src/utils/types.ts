import { Prisma } from '@prisma/client'

export const collectableCountSelect = {
  id: true,
  name: true,
  collectable: {
    select: {
      image: true,
      tags: true,
      collection: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  },
  count: true,
} satisfies Prisma.CollectableCountSelect

export type collectableCount = Prisma.CollectableCountGetPayload<{ select: typeof collectableCountSelect }>

export const collectableCountCreateSelect = {
  name: true,
  count: true,
} satisfies Prisma.CollectableCountSelect

export type collectableCountCreate = Prisma.CollectableCountGetPayload<{ select: typeof collectableCountCreateSelect }>

export const collectionSelect = {
  name: true,
  image: true,
  collectables: {
    select: collectableCountSelect,
  },
  tags: true,
} satisfies Prisma.CollectionSelect

export type collection = Prisma.CollectionGetPayload<{ select: typeof collectionSelect }>

export type CollectionCollectable = {
  [key: string]: {
    image?: string
    collectables: collectableCount[]
  }
}

export const collectionConnectSelect = {
  name: true,
} satisfies Prisma.CollectionSelect

export type collectionConnect = Prisma.CollectionGetPayload<{ select: typeof collectionConnectSelect }>

export const tradeSelect = {
  id: true,
  seller: { select: { name: true, image: true } },
  buyer: { select: { name: true, image: true } },
  collectable: {
    select: {
      name: true,
      image: true,
    },
  },
  price: true,
  status: true,
} satisfies Prisma.TradeSelect

export type trade = Prisma.TradeGetPayload<{ select: typeof tradeSelect }>
