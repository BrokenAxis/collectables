/* eslint-disable @typescript-eslint/no-unused-vars */
enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

enum profileCollection {
  INVENTORY,
  WISHLIST,
  WARES,
}

enum Role {
  USER,
  MANAGER,
  ADMIN,
  NULL,
}

type ProfileReview = {
  reviewer: {
    id: string
    name: string
    description: string | null
    image: string | null
    reputation: number
  }
  review: number
  description: string
}

type CampaignReview = {
  reviewer: {
    id: string
    name: string
    description: string | null
    image: string | null
    reputation: number
  }
  review: number
  description: string
}

type Collection = {
  name: string
  image?: string
  tags: string[]
  collectables: Collectable[]
  achievement: Achievement
}

type Collectable = {
  name: string
  image?: string
  tags: string[]
}

type Campaign = {
  name: string
  image?: string
  tags: string[]
  collections: Collection[]
  isActive: boolean
  start: Date
  end: Date
  managers: User[]
  views: number
  viewData: number[]
}

type ForumPost = {
  author: {
    id: string
    name: string
    description: string | null
    image: string | null
    reputation: number
    user: User
  }
  comments: PostComment[]
} & {
  id: number
  title: string
  description: string
  image: string | null
  tags: string[]
  campaignName: string | null
  authorId: string
  createdAt: Date
}

type PostComment = {
  author: {
    id: string
    name: string
    description: string | null
    image: string | null
    reputation: number
    user: User
  }
} & {
  id: number
  parentCommentId: number | null
  postId: number
  authorId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

type UserProfile = {
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

type Trade = {
  id: string
  seller: UserProfile
  sellerId: string
  buyer: UserProfile
  buyerId: string
  collectable: Collectable
  collectableId: string
  status: Status
  price: number
  createdAt: Date
  buyerConfirmed: boolean
  sellerConfirmed: boolean
}

type Achievement = {
  id: string
  name: string
  description: string
  image: string
  users: UserProfile[]
  collection: Collection
}

type Review = {
  id: string
  rating: number
  comment: string
  reviewee: UserProfile
  revieweeId: string
  reviewer: UserProfile
  reviewerId: string
}

type Chat = {
  id: number
  Message: Message[]
  users: UserProfile[]
}

type Message = {
  id: string
  chatId: number
  chat: Chat
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

type FormattedChat = {
  id: number
  latestMessage?: Message | null | undefined
  receiver: Receiver
  image: string
}

type Receiver = {
  description: string
  id: string
  image: string
  name: string
  reputation: number
}

type Profile = {
  id: string
  name: string
  description: string | null
  image: string | null
  reputation: number
  inventory: CollectableCount[]
  wishlist: CollectableCount[]
  wares: CollectableCount[]
  achievements: Achievement[]
  banned: boolean
  user: User
}

type CollectionCollectable = {
  [key: string]: {
    image?: string
    collectables: {
      collectable: Collectable
      count: number
      name: string
      tags: string[]
    }[]
  }
}

type User = {
  id: string
  role: Role
  profile: Profile
  campaigns: Campaign[]
}

type CollectableCount = {
  id: number
  collectable: Collectable
  name: string
  count: number
  inventory: Profile[]
  wishlist: Profile[]
  wares: Profile[]
}

type ChartData = { name: string; value: number }[]

type CommentReport = {
  content: string
  author: string
  reports: number
}

type PriceData = {
  date: string
  price: number
}[]
