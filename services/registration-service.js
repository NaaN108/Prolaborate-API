var sanitizer = require('sanitize')();
const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');
const { resolve } = require('path');

/**This method will add a user to the database
 * 
 * @param {string} userEmail 
 * @param {string} userFirstName 
 * @param {string} userLastName 
 */
const addUser = async (userEmail, userFirstName, userLastName, prisma) => {

    //sanitize all input values
    var userEmail = sanitizer.value(userEmail, 'string')
    var userFirstName = sanitizer.value(userFirstName, 'string')
    var userLastName = sanitizer.value(userLastName, 'string')
    
    var id = randomUUID() // generate uuid
    
    //create db entry
    await prisma.users.create({data: {Id: id, FirstName: userFirstName, LastName: userLastName, UserRole_Id: "SYSTEM-USER", Status: 'active', 
    EmailId: userEmail, Password: "AQcoLikHQwE9A4IBJPkdn/IzNhb2c0Y3KfcYOAWLyFw=", CreatedDate: new Date(), ModifiedDate: new Date(), CreatedBy: 'System',
    ModifiedBy: 'System', IsPasswordSet: 0, IsAdmin: 0, ShowHelpText: 1, SecPhrase: 'qbAWQQtdTH2LTgw=', IsReadOnly: 0, UserName: userEmail, 
    Email: userEmail, NormalizedEmail: userEmail, EmailConfirmed: false, SecurityStamp: '2STZLQMPSUW4APPIGNTCVGQSBXINMZP3', 
    PasswordHash: 'AQAAAAEAACcQAAAAEAB8RRcG0UueJjKbo/J7ZI3rANCZGkCaHt808/A5Gdkr3zMHeEfIpyvy0B1RAcZpNA==', TwoFactorEnabled: false, 
    LockoutEnabled: false, AccessFailedCount: 0}})
}
/** This function will find all users with a given email
 * 
 * @param {string} userEmail email to be queried
 * @param {PrismaClient} prisma prisma client object
 * @returns list of users with specified email
 */
const findUser = async (userEmail, prisma) => {
    const user = await prisma.users.findMany({
        where: {
            EmailId: userEmail
        }
    })
    return user
}

/** This function will remove all users with a given email
 * 
 * @param {string} userEmail email to be removed
 * @param {PrismaClient} prisma prisma client object
 */
const removeUser = async (userEmail, prisma) => {
    await prisma.users.delete({
        where: {
            email: userEmail
        }
    })
}

module.exports = {
    addUser,
    findUser,
    removeUser
}