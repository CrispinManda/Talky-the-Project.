import { Router } from "express";
import {  loginUser, registerUser } from "../controller/usersController";
import { verifyToken } from "../middleware/getToken";

const User_router = Router()

User_router.post('/register', registerUser)
 User_router.post('/login', loginUser)
// employee_router.get('/', verifyToken, getAllEmployees)
// employee_router.get('/check_user_details',verifyToken, checkUserDetails)
// employee_router.get('/:id', verifyToken, getOneEmployees)
// employee_router.put('/:employee_id', employeeStatus)

export default User_router;