const id = require('shortid');
const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const { Register } = require('../models/');




const auth = async (req, res) => {
    const { email, password} = req.body;
    const user = await Register.findAll({ where: { email: email } });

    try {
        if (!user) {
            return await res.status(401).json({
                msg: 'Invalid username or password',
                statusCode: 401
            })
        }
        else {
            bc.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: 'Invalid username or password',
                        statusCode: 401
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        password: user[0].password
                    }, 'secrete',
                        {
                            expiresIn: 3600
                        }
                    );
                    return res.status(200).json({
                        msg: 'success',
                        user: user,
                        token: token,
                        expiresIn: 3600
                    })
                }
                return res.status(401).json({
                    msg: 'Invalid username or password',
                    statusCode: 401,
                })

             })
        }
        
        }
        catch (error) {
            if (error) {
            return res.status(500).json({
            error: {
                    msg: 'Server Error' + error,
                statusCode: 500
            }
           }) 
        }
        }
        

}


const register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;
    const findEmail = await Register.findAll({ where: { email: email } });
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
        else if (findEmail.length <= 0) {
            await bc.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                    error: {
                    msg: 'Server Error',
                    statusCode: 500
                }
            })
                } else {
        Register.create({
            id: id(),
           firstName: firstName,
           lastName: lastName,
           email: email,
           phoneNumber: phoneNumber,
           password: hash
       })
            return res.status(201).json({
                msg: 'success',
                statusCode: 201
        })
                }
        

             })  
            
        }
        
             else return await res.status(409).json({
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
    const getAllRegistered = await Register.findAll();

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
    const findById = await Register.findByPk(id);

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

    const updateById = await Register.findByPk(id);
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
        await Register.update({
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
    const destroyById = await Register.findByPk(id);

    try {
        
        if (!destroyById) {
            return await res.status(404).json({
                error: {
                    msg: 'Record Not Found',
                    statusCode: 404
              }
          })   
        }
        await Register.destroy({ where: { id: id } }) 
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




module.exports = {register,auth, index, show, amend, destroy }