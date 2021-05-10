import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from './profile';
import {Token} from './token';

const baseUrl = 'http://interviews.poolpool.xyz'; // TODO: move to config
const identificationUrl = `${baseUrl}/auth/login`;
const profileUrl = `${baseUrl}/profile`;

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) {
  }

  identification(data: { username, password }): Observable<Token> {
    return this.httpClient.post(identificationUrl, data) as Observable<Token>;
  }

  getProfileData(): Observable<Profile> {
    return this.httpClient.get(profileUrl) as Observable<Profile>;
  }

}
