import { Injectable } from '@angular/core';
import { environment } from '../..//environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResults } from '../_models/pagination';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, LikesParam?): Observable<PaginatedResults<User[]>> {
    const paginatedResult: PaginatedResults<User[]> = new PaginatedResults<User[]>();
    // itemsPerPage = 10;
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (LikesParam === 'Likers') {
      params = params.append('likers', 'true');

    }

    if (LikesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getuser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userID: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userID + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userID: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userID + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }
}
