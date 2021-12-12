var addUserValidate = [
    check('emailAddress').isEmail().trim().escape().normalizeEmail(),
    check('lastName').trim().escape(),
    check('firstName').trim().escape()
    ]

module.exports = {
    addUserValidate
}