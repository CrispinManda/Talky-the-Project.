import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import employee_router from './routes/employeeRoutes'
import projects_router from './routes/projectRoutes'
import teamsRouter from './routes/teamsRoutes'
import User_router from './routes/userRoutes'
import post_router from './routes/postRoutes'

const app = express()

app.use(cors())
app.use(json())

app.use('/employee', employee_router)
app.use('/projects', projects_router)
app.use('/teams', teamsRouter)
app.use('/user',User_router )
app.use('/post',post_router )

app.use((error: Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: error.message
    })
})

app.listen(4400, ()=>{
    console.log("Server running on port 4400");
})

export default app