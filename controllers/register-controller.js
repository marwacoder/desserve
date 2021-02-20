const id = require('shortid');
const bc = require('bcrypt');
const validate = require('express-validator');
const { Register } = require('../models/');


const Register = async (req, res, next) => {

    const {firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;
    
    try {
        
    }
    catch (error) {
        if (error) {
        
    return res.status(500).json({
        error: {
            message: 'Server Error',
            statusCode: 500
        }
    })
    }
        
    }
}



module.exports = {Register}