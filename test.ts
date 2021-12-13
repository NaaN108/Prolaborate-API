import { MockContext, Context, createMockContext } from './context'
import { addUser, userExists } from './services/Default'
import { mockAddUser, mockUpdateUser } from './mockData'
import {PrismaPromise, Users} from '@prisma/client'

let mockCtx: MockContext
let ctx: Context
mockCtx = createMockContext()
ctx = mockCtx as unknown as Context
beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})
console.debug('tedwaadawst')
console.log('fewfreerergeer')
test('should create new user ', async () => {
  mockCtx.prisma.users.create.mockResolvedValue(mockAddUser)
  console.log('ufefuwwf')
  console.log(ctx)
  await expect(addUser("john.doe@test.com", "John", "Doe", ctx)).resolves.toEqual(null)
})

test('should return that user exists', async () =>{
  var mockData = new Promise((resolve, reject) =>{resolve([mockAddUser])})
  var mockDatab = <PrismaPromise<Array<Users>>>(mockData)
  mockCtx.prisma.users.findMany.mockReturnValue(mockDatab)
  var z = await mockCtx.prisma.users.findMany()
  await expect(userExists("john.doe@test.com", ctx)).resolves.toEqual(true)
})