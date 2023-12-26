import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import { loginUser, registerUser } from '../controller/usersController'
import { Request, Response } from 'express'
import dbHelper from '../dbhelpers/dbhelpers'

jest.mock("../dbhelpers/dbhelpers")

describe ("User Registration", ()=>{
 
    let res:any;

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    })

   

    it('registers a user using dbhelpers' , async()=>{
        const req = {
            body: {
                name: "Test Test", 
                email: "test@yopmail.com", 
                password: "HashedPass@word123"
            }
        }

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("HashedPass@word123" as never);

        ((dbHelper.execute as jest.Mock)).mockResolvedValueOnce({
            rowsAffected : [1]
        })

        await registerUser(req as Request, res as any)

        expect(res.json).toHaveBeenCalledWith({message: 'User registered successfully'})
        expect(res.status).toHaveBeenCalledWith(200)
    })

})




describe ("Testing Login Functionality", ()=>{

    let res:any

    beforeEach(()=>{
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Returns an error if email or password is empty' ,async()=>{
        const req = {
            body:{
                email: "",
                password: ""
            }
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({"error": "\"email\" is not allowed to be empty"})

    })

    it('Returns an error if email or password is missing' ,async()=>{
        const req = {
            body:{
                
            }
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({"error": "\"email\" is required"})

    })

    it("Returns an error if email is not in database", async()=>{
        const req = {
            body:{
                email: "incorrect@email.com",
                password: "12345678"
            } 
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: []})
        } as never)
 
        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({error: "Email not found"}) 
    })

    it("Handles incorrect password scenario", async()=>{
        const req = {
            body:{
                email: "correct@email.com",
                password: "wrongPassword"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{
                    email: 'correct@email.com',
                    password: 'hashedPwd'
                }]
            })
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({error: "Incorrect password"})
    })

    it("successfully logs in a user and returns a token", async()=>{

        let expectedUser = {
            User_id: "0adbb3b5-dead-448f-9ca1-44f93d0e5527",
            name: "Jane Doe",
            email: "correct@email.com",
            phone_no: '0754876562',
            id_no: 363784563,
            KRA_PIN: 'ADjCC22XXY3',
            NHIF_NO: '1170784J43',
            NSSF_NO: 'ksdhu7879DS',
            password: "$2b$05$S.fpxBj3qNllnIvd.sq/beDjNoP72TvaMAS.GrplxY75sFyh6qV7e",
            role: "User",
            welcomed: true
        }

        const req = {
            body:{
                email: expectedUser.email,
                password: "correctPassword"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [expectedUser]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce("generate-token-jghjg-jyiugjxz-mmhjruyiu" as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in successfully",
            token: "generate-token-jghjg-jyiugjxz-mmhjruyiu"
        }) 
    }) 
}) 