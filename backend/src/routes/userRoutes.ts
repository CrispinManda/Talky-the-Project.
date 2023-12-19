import { Router } from "express";
import {  followUser,
    // getAllFollowers,
     getAllUsers, getFollowers,  getFollowings,  getOneUser, getUserProfile, initiatePasswordResetController, likePost, loginUser, registerUser, resetPasswordControllers, toggleFollowUser } from "../controller/usersController";
import { verifyToken } from "../middleware/getToken";


const User_router = Router()

User_router.post('/register', registerUser)
 User_router.post('/login', loginUser)
 User_router.get('/', verifyToken, getAllUsers)
 User_router.get('/:id', verifyToken, getOneUser)
 User_router.put('/:postId/like', verifyToken, likePost);
 User_router.post('/follow/:userId', verifyToken, followUser);
 User_router.get("/getFollowers/:ID", getFollowers);
 //User_router.get('/followers/:userId', verifyToken, getAllFollowers);
User_router.get('/profile/:id', verifyToken, getUserProfile)
User_router.post('/initiate-password-reset', initiatePasswordResetController);
User_router.post('/reset-password', resetPasswordControllers);
User_router.post("/toggleFollowUser", toggleFollowUser);
// User_router.get("/:Id/followingsCount", getFollowingsCount);
User_router.get("/getFollowings/:ID",verifyToken, getFollowings);


export default User_router;