import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import { requestHandler, supabase } from '@Source/utils/supabaseUtils'
import { getUserId } from '@Source/utils/utils'
import SupabaseService from '@Source/utils/Supabase.service'

const prismaMock = mockDeep<PrismaClient>()

jest.mock('@Source/utils/supabaseUtils', () => ({
  requestHandler: jest.fn(() => Promise.resolve(prismaMock)),
  supabase: jest.fn(() => SupabaseService.getInstance()),
  validateUser: jest.fn(() => Promise.resolve(true)),
  extractId: jest.fn(() => ''),
  // getUserId: jest.fn(() => Promise.resolve('')),
}))

afterEach(() => {
  mockReset(requestHandler)
  mockReset(prismaMock)
  mockReset(supabase)
})

export const prismaMockInstance = prismaMock as unknown as DeepMockProxy<typeof prismaMock>
export const getUserIdMock = getUserId as unknown as jest.MockedFunction<typeof getUserId>
