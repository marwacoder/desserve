const id = require('shortid');
const {validationResult} = require('express-validator');
const { Career } = require('../models');





const register = async (req, res) => {
    const {
        firstName, lastName, age,
        email, phoneNumber, homeAddress1,
        homeAddress2, stateOfOrigin,
        qualification, workExp, interest
    } = req.body;
        
    const findEmail = await Career.findAll({ where: { email: email } });
    const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: {
                        msg: errors.array()[0].msg,
                        param: errors.array()[0].param,
                        statusCode: 422
                        
                    }
                })
            }
        if (findEmail.length <= 0) {
            
        Career.create({
            id: id(),
           firstName: firstName,
           lastName: lastName,
           email: email,
           phoneNumber: phoneNumber,
            age: age,
            homeAddress1: homeAddress1,
            homeAddress2: homeAddress2,
            stateOfOrigin: stateOfOrigin,
            qualification: qualification,
            workExp: workExp,
           interest: interest
       })
            return res.status(201).json({
                msg: 'success',
                statusCode: 201
        })  
            
        }
        
     return await res.status(409).json({
            error: {
                msg: 'Email already exist',
                statusCode: 409
            }
        })


        
    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                error: {
                    msg: 'Server Error',
                    statusCode: 500
                }
            })
        }
    }
}


const index = async(req, res) => {
    const getAllRegistered = await Career.findAll();

    try {
        if (getAllRegistered) {
            
            return res.status(200).json({
                users: getAllRegistered,
                msg: 'success',
                statusCode: 200
            })
        }

        
    }
    catch (error) {
        if (error) {
            return res.status(500).json({
            error: {
                    msg: 'Server Error',
                statusCode: 500
            }
           }) 
        }
    }
}

const show = async (req, res) => {
    
    const { id } = req.params;
    const findById = await Career.findByPk(id);

    try {
        
        if (findById) {
            
            return await res.status(200).json({
                users: findById,
                msg: 'success',
                statusCode: 200
            })
        }
        return await res.status(404).json({
            error: {
                msg: 'Record Not Found',
                statusCode: 404
            }
        })


    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                msg: 'Server Error',
                statusCode: 500
            })
        }
    }

}


const amend = async (req, res) => {

    const { id } = req.params;
    const updateById = await Career.findByPk(id);
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: {
                        msg: errors.array()[0].msg,
                        param: errors.array()[0].param,
                        statusCode: 422
                        
                    }
                })
            }
        
        if (!updateById) {
            return await res.status(404).json({
                error: {
                    message: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Career.update({
          ...req.body
        },{ where: { id: id } }) 
            return await res.status(201).json({
                msg: 'success',
                statusCode: 201
            })

    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                msg: 'Server Error',
                statusCode: 500
            })
        }
    }

}

const destroy = async(req, res)=>{
    const { id } = req.params;
    const destroyById = await Career.findByPk(id);

    try {
        
        if (!destroyById) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Career.destroy({ where: { id: id } }) 
            return await res.status(201).json({
                message: 'success',
                statusCode: 201
            })

    }
    catch (error) {
        if (error) {
            return res.status(500).json({
                msg: 'Server Error',
                statusCode: 500
            })
        }
        
    }

}



module.exports = {register, index, show, amend, destroy}