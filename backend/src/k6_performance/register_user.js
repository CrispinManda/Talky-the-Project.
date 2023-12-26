import http from 'k6/http';
import {sleep, check} from 'k6'

export const options = {
    vus: 5,
    duration: '1s'
}

export default function (){

    const body = JSON.stringify({
      Username: "tifdgn Crews",
      Email: "tifdfn@gmail.com",
      PasswordHash: "12345678",
    });

    const params = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    let response = http.post('http://localhost:4400/user/register', body, params);

    check(response, {
        'is status 200?' : (res)=>res.status == 200,
        'is successfully registered ?' : (res)=> res.body.includes('User registered successfully')
    })

    sleep(1)
}