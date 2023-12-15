import joi from 'joi'

export const registerUserSchema = joi.object({
        name: joi.string(),
        email : joi.string().email(),
        phone_no: joi.string().min(10),
        id_no: joi.number().min(8),
        KRA_PIN: joi.string(),
        NHIF_NO: joi.string(),
        NSSF_NO: joi.string(),
        password: joi.string()
})

export const loginUserSchema = joi.object({
        email: joi.string().email().required(), 
        password: joi.string().required()
})



export const registerUsersSchema = joi.object({
        Username: joi.string().min(3).max(50).required(),
        Email: joi.string().email().required(),
        PasswordHash: joi.string().min(6).required(),
     
    
       
});

export const loginUsersSchema = joi.object({
        Email: joi.string().email().required(), 
        PasswordHash: joi.string().required()
})

