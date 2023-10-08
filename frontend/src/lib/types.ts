enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export type Collectable = {
  id: string
  name: string
  collection: UserProfile[]
  wishlist: UserProfile[]
  wares: UserProfile[]
  Trade: Trade[]
}

export type UserProfile = {
  id: string
  name: string
  collection: Collectable[]
  wishlist: Collectable[]
  wares: Collectable[]
  description: string
  image: string
  achievements: Achievement[]
  sales: Trade[]
  purchases: Trade[]
  reputation: number
  reviewsGiven: Review[]
  reviewsReceived: Review[]
  chats: Chat[]
}

export type Trade = {
  id: string
  seller: UserProfile
  sellerId: string
  buyer: UserProfile
  buyerId: string
  collectable: Collectable
  collectableId: string
  status: Status
  price: number
}

export type Achievement = {
  id: string
  name: string
  description: string
  image: string
  users: UserProfile[]
}

export type Review = {
  id: string
  rating: number
  comment: string
  reviewee: UserProfile
  revieweeId: string
  reviewer: UserProfile
  reviewerId: string
}

export type Chat = {
  id: number
  Message: Message[]
  users: UserProfile[]
}

export type Message = {
  id: string
  chatId: number
  chat: Chat
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  updatedAt: Date
}
