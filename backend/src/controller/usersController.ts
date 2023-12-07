import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
import { LoginUser } from '../interfaces/users'
import { ExtendedUser } from '../middleware/getToken'
import { loginUsersSchema, registerUsersSchema } from '../validators/validators'
import { isEmpty } from 'lodash'
import dbHelper from '../dbhelpers/dbhelpers'


export const registerUser = async (req: Request, res: Response) => {
    try {
        // Destructure values from the request body
        let { Username, Email, Password, FullName, 
           // Bio, 
           // ProfilePictureURL 
        } = req.body;

        // Validate request body against the schema
        let { error } = registerUsersSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details });
        }

        // Generate a unique UserID using UUID v4
        let UserID = v4();

        // Hash the user's password
        const hashedPwd = await bcrypt.hash(Password, 5);

        // Execute the database operation to register the user
        let result = await dbHelper.execute('registerUsers', {
            UserID,
            Username,
            Email,
            FullName,
           // Bio,
            //ProfilePictureURL,
            Password: hashedPwd,
        });

        // Check if the user registration was successful
        if (result.rowsAffected[0] === 0) {
            return res.status(500).json({
                message: 'Something went wrong, User not registered',
            });
        } else {
            return res.status(200).json({
                message: 'User registered successfully',
            });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error during user registration:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body;

        const { error } = loginUsersSchema.validate(req.body);

        if (error) {
            return res.status(422).json({ error: error.message });
        }

        const pool = await mssql.connect(sqlConfig);

        let user = await (await pool
            .request()
            .input("email", Email)
            .input("password", Password)
            .execute('loginUser')).recordset;

        console.log(user);

        if (user[0]?.email == Email) {
            const correctPwd = await bcrypt.compare(Password, user[0]?.password);

            if (!correctPwd) {
                return res.status(401).json({
                    error: "Incorrect password",
                });
            }

            const loginCredentials = user.map((records) => {
                const { Username, FullName, Bio, Password, ProfilePictureURL, welcomed, ...rest } = records;

                return rest;
            });

            const token = jwt.sign(loginCredentials[0], process.env.SECRET as string, {
                expiresIn: '24h',
            });

            return res.status(200).json({
                message: "Logged in successfully",
                token,
            });
        } else {
            return res.status(404).json({
                error: "Email not found",
            });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
};
