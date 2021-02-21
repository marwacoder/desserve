const { body} = require('express-validator');


const validate = (method) => {
    switch (method) {
        case 'career': {
            return [
                body('firstName', 'must be a valid first name').notEmpty(),
                body('lastName', 'must be a valid last name').notEmpty(),
                body('age', 'not a valid age').isNumeric().notEmpty(),
                body('phoneNumber', 'must be a valid phone Number').isMobilePhone(),
                body('email', 'must be a valid email address').isEmail(),
                body('homeAddress1', 'must be a valid home address').notEmpty(),
                body('homeAddress1', 'must be a valid home address').optional(),
                body('stateOfOrigin', 'must be a valid state').notEmpty(),
                body('qualification', 'must not be empty').notEmpty(),
                body('workExp', 'must not be empty').notEmpty(),
                body('interest', 'must not be empty').notEmpty() 
            ]
        }
            case 'register': {
            return [
                body('firstName', 'must be a valid first name').notEmpty(),
                body('lastName', 'must be a valid last name').notEmpty(),
                body('email', 'must be a valid email address').isEmail(),
                body('phoneNumber', 'must be a valid phone Number').isMobilePhone(),
                body('password').custom((value, { req }) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error('password not matched');
                    }
                    return true;
                })

            ]
        }
            case 'id': {
            return [
                body('id', 'id must not be empty').notEmpty()
            ]
        }
    }
    
}

module.exports = { validate };