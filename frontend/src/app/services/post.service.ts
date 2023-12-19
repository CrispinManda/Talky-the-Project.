import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:4400'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      token,
    });
  }

  registerUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, user);
  }

  loginUser(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/user/login`;
    return this.http.post(url, credentials);
  }

  getAllUsers(): Observable<any> {
    const url = `${this.apiUrl}/user`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  createPost(postData: any): Observable<any> {
    const url = `${this.apiUrl}/post/create`;
    const headers = this.getHeaders();
    return this.http.post(url, postData, { headers });
  }

  getAllPosts(): Observable<any> {
    const url = `${this.apiUrl}/post/Allposts`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  
  createComment(commentData: any): Observable<any> {
    const url = `${this.apiUrl}/post/createcomment`;
    const headers = this.getHeaders();
    return this.http.post(url, commentData, { headers });
  }

  getAllComments(): Observable<any> {
    const url = `${this.apiUrl}/post/allcomments`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  updateComment(commentData: any): Observable<any> {
    const url = `${this.apiUrl}/post/updatecomment`;
    const headers = this.getHeaders();
    return this.http.put(url, commentData, { headers });
  }

  followUser(userIdToFollow: string): Observable<any> {
    const url = `${this.apiUrl}/user/Follow/${userIdToFollow}`;
    const headers = this.getHeaders();
    return this.http.post(url, {}, { headers });
  }

  likePost(postId: string): Observable<any> {
    const url = `${this.apiUrl}/post/likepost`;
    const headers = this.getHeaders();
    const body = { UserId: 'currentUserId', PostId: postId }; // Replace 'currentUserId' with actual user ID
    return this.http.post(url, body, { headers });
  }

  toggleFollowUser(
    followingUserId: string,
    followedUserId: string
  ): Observable<any> {
    const url = `${this.apiUrl}/user/toggleFollowUser`;
    const headers = this.getHeaders();
    const body = { followingUserId, followedUserId };
    return this.http.post(url, body, { headers });
  }

  getFollowings(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user/getFollowings/${userId}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }
}
