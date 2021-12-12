
const {prisma} = require('./client')
const { addUser } = require("./services/registration-service")
var assert = require('assert');
const { findUser } = require("./services/registration-service");



describe('add user', function() {
    it('creates user and checks it has been created', async function() {
        const res = await addUser('testuser@test.com', 'test', 'user');
        const user = await findUser('testuser@test.com')
        assert.notEqual(user, null)
    })
})