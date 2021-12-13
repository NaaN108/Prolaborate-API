const sanitizer = require('express-sanitizer')();
import { Context } from '../context'
const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');
const { resolve } = require('path');

/**This method will add a user to the database
 * 
 * @param {string} userEmail 
 * @param {string} userFirstName 
 * @param {string} userLastName 
 */
const addUser = async (userEmail: string, userFirstName: string, userLastName: string, ctx: Context) => {
    
    var id = randomUUID() // generate uuid
    
    //create db entry
    await ctx.prisma.users.create({data: {Id: id, FirstName: userFirstName, LastName: userLastName, UserRole_Id: "SYSTEM-USER", Status: 'active', 
    EmailId: userEmail, Password: "AQcoLikHQwE9A4IBJPkdn/IzNhb2c0Y3KfcYOAWLyFw=", CreatedDate: new Date(), ModifiedDate: new Date(), CreatedBy: 'System',
    ModifiedBy: 'System', IsPasswordSet: 0, IsAdmin: 0, ShowHelpText: 1, SecPhrase: 'qbAWQQtdTH2LTgw=', IsReadOnly: 0, UserName: userEmail, 
    Email: userEmail, NormalizedEmail: userEmail, EmailConfirmed: false, SecurityStamp: '2STZLQMPSUW4APPIGNTCVGQSBXINMZP3', 
    PasswordHash: 'AQAAAAEAACcQAAAAEAB8RRcG0UueJjKbo/J7ZI3rANCZGkCaHt808/A5Gdkr3zMHeEfIpyvy0B1RAcZpNA==', TwoFactorEnabled: false, 
    LockoutEnabled: false, AccessFailedCount: 0}})
    return null
}
/** This function will find all users with a given email
 * 
 * @param {string} userEmail email to be queried
 * @param {PrismaClient} prisma prisma client object
 * @returns list of users with specified email
 */
const findUser = async (userEmail: string, ctx: Context) => {
    return await ctx.prisma.users.findMany()
}

/** This function returns whether or not a given user exists
 * 
 * @param {string} userEmail email to be queried
 * @param {Context} ctx prisma client object
 * @returns {boolean} whether or not client exists
 */
const userExists = async (userEmail: string, ctx: Context) => {
    return findUser(userEmail, ctx).then(function(users) {
        if (users.length>=1){ // empty list should be returned by findUser if user doesn't exist
            return true
        }
        else{
            return false
        }
    })    
}

/** This function will remove all users with a given email
 * 
 * @param {string} userEmail email to be removed
 * @param {PrismaClient} prisma prisma client object
 */
const removeUser = async (userEmail: string, ctx: Context) => {
    await ctx.prisma.users.deleteMany({
        where: {
            EmailId: userEmail
        }
    })
}

module.exports = {
    addUser,
    findUser,
    removeUser,
    userExists
}