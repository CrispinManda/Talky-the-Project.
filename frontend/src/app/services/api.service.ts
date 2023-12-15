import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, usersDetails } from 'src/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getUsers(){
    let token = localStorage.getItem('token') as string
    return this.http.get<{Users: User[]}>('http://localhost:4400/user', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  createUsers (Users: usersDetails){
    console.log(Users);
   this.http.post('http://localhost:4400/user/register', Users).subscribe(data=>{
    return data
   })
   
  }


}