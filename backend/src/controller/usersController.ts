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
import dbhelpers from '../dbhelpers/dbhelpers'
import { generateResetToken } from '../generateResetToken'
import { validatePostId } from '../validators/post'
import { execute } from '../dbhelpers/dbHelper'


export const registerUser = async (req: Request, res: Response) => {
    try {
        
        let { Username, Email, PasswordHash } = req.body;
     
        let { error } = registerUsersSchema.validate(req.body);

        if (!Username || !Email || !PasswordHash) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
           
            
        }
       
        let UserID = v4();

        
        const hashedPwd = await bcrypt.hash(PasswordHash, 5);

        let result = await dbHelper.execute('registerUsers', {
            UserID,
            Username,
            Email,
            PasswordHash: hashedPwd,
        });
console.log(result.recordset)
        
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
        const { Email, PasswordHash } = req.body;

        const { error } = loginUsersSchema.validate(req.body);

        if (error) {
            return res.status(422).json({ error: error.message });
        }

        const pool = await mssql.connect(sqlConfig);

        let user = await (await pool
            .request()
            .input("Email", Email)
            .input("PasswordHash", PasswordHash)
            .execute('loginUser')).recordset;

        console.log(user);

        if (user[0]?.Email == Email) {
            const correctPwd = await bcrypt.compare(PasswordHash, user[0]?.PasswordHash);

            if (!correctPwd) {
                return res.status(401).json({
                    error: "Incorrect password",
                });
            }

            const loginCredentials = user.map((records) => {
                const { Username, FirstName, Bio, Password, ProfilePictureURL, welcomed, ...rest } = records;

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


export const getAllUsers = async(req:Request, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let users = (await pool.request().execute('fetchAllUsers')).recordset
        // let employees = (await pool.request().query('SELECT * FROM Employees')).recordset

        return res.status(200).json({
            users: users
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getOneUser = async(req:Request, res:Response)=>{
    try {

        let id = req.params.id 

        const pool = await mssql.connect(sqlConfig)

        let User = (await pool.request().input('Userid',id).execute('fetchOneUser')).recordset
       

        return res.status(200).json({
            User: User
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}


export const initiatePasswordResetController = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      const user = await dbhelpers.execute('getUserByEmail', { email });
  
      if (!user.recordset || user.recordset.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const resetToken = generateResetToken();
      console.log(resetToken);
  
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
  
      await dbhelpers.execute('SetResetTokenAndExpiration', {
        email,
        resetToken,
        expiryTime: expiration.toISOString(),
      });
  

      res.status(200).json({ message: 'Reset token sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const resetPasswordControllers = async (req: Request, res: Response) => {
    try {
      const { email, resetToken, newPassword } = req.body;
      console.log("reset token ", resetToken);
      newPassword
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      const result = await dbhelpers.execute('ResetPassword', {
        email,
        resetToken,
        newPassword: hashedPassword,
      });
  
      console.log("rows affected", result.rowsAffected);
  
      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: 'Password reset successful.' });
        return;
      }
  
      console.log("Record sets", result.recordset);
  
      if (result.recordset && result.recordset.length > 0) {
        const message = result.recordset[0].message;
        console.log("message:", message);
  
        if (message === 'Password updated successfully') {
          res.status(200).json({ message: 'Password reset successful' });
        } else if (message === 'Invalid token') {
          res.status(400).json({ message: 'Invalid reset token' });
        } else if (message === 'Invalid email') {
          res.status(400).json({ message: 'Invalid email' });
        } else {
          res.status(500).json({
            message: 'Error resetting password',
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

 export const forgotPasswordController = (req: Request, res: Response) => {
    try {
  
    } catch (error) {
      return res.json({
        error: error
      })
    }
  }



  export const getUserProfile = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const userProfile = await execute('getUserProfileProcedure', { userId });
     console.log(userProfile);
     
      if (userProfile && userProfile.recordset.length !== 0) {
        return res.status(200).json({ userProfile: userProfile.recordset[0] });
      } else {
        return res.status(404).json({ error: 'User profile not found' });
      }
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  


  export const likePost = async (req: Request, res: Response) => {
    try {
      const { PostId, UserId } = req.body;
      // console.log(req.body);
      const LikeId = v4()
  
      // Call the stored procedure to handle the like operation
      const likePostProcedure = "likePost";
      const likePostParams = {LikeId,PostId, UserId};
  
      const result = await execute(likePostProcedure, likePostParams);
       
      // Check the result from the stored procedure and send an appropriate response
      if (result && result.recordset.length != 0 ) {
      //  console.log(result);
       console.log(result.recordset);
  
  
        const message  = result.recordset[0].Message
  
        if (message.includes("Post liked successfully")) {
  
          const updateLikesQuery = `UPDATE Posts SET Likes = Likes + 1 WHERE PostId = '${PostId}'`;
          await dbHelper.execute(updateLikesQuery);
  
        return res.status(200).json({ message });
          
        }
        return res.status(500).json({ error: message });
  
      } else {
        return res.status(500).json({ error: "Failed to process the like operation" });
      }
    } catch (error) {
      console.error("Error in likePost:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

export const followUser = async (req: Request, res: Response) => {
  try {
    const { FollowerUserId, FollowingUserId } = req.body;
    const FollowerId = v4();

    // Insert a new follower relationship into the Followers table
    const followUserProcedure = "followUser";
    const followUserParams = { FollowerId, FollowerUserId, FollowingUserId };

    
    

    const result = await execute(followUserProcedure, followUserParams);
    console.log(result);

    // Check the result from the stored procedure and send an appropriate response
    if (result && result.recordset.length != 0 ) {
      //  console.log(result);
       console.log(result.recordset);
  
  
        const message  = result.recordset[0].Message

      if (message.includes("User followed successfully")) {
        return res.status(200).json({ message });
      }
      return res.status(500).json({ error: message });
    } else {
      return res.status(500).json({ error: "Failed to process the follow operation" });
    }
  } catch (error) {
    console.error("Error in followUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getFollowers = async (req: Request, res: Response) => {
  try {
    let  followed_UserId  = req.params.Id;

    let followers = (
      await execute("fetchFollowers", {
        followed_UserId,
      })
    ).recordset;

    return res.status(200).json({
      followers: followers,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};