import express from 'express'
import cron from 'node-cron'
import { welcomeuser } from './mailservices/welcomeUser'


const app = express()

const run = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await welcomeuser()
    })
    
}

run()


app.listen(4401, ()=>{
    console.log('Mail server up and running ...'); 
})