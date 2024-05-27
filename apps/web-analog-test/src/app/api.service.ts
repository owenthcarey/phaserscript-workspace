import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRSSFeed(): Observable<string> {
    return this.http.get('/api/v1/rss.xml', { responseType: 'text' });
  }

  getUserProfile(id: string): Observable<string> {
    return this.http.get(`/api/v1/users/${id}`, { responseType: 'text' });
  }

  addUser(user: any): Observable<any> {
    return this.http.post('/api/v1/users', user);
  }

  getQueryGreeting(param1: string, param2: string): Observable<string> {
    return this.http.get(`/api/v1/query?param1=${param1}&param2=${param2}`, { responseType: 'text' });
  }

  getDefaultPage(): Observable<string> {
    return this.http.get('/api/v1/anything/you/type/here', { responseType: 'text' });
  }

  getId(id: string): Observable<string> {
    return this.http.get(`/api/v1/users/${id}`, { responseType: 'text' });
  }
}
