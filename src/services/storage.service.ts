import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  endpoint = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getLocker() {
    return this.http.get(this.endpoint);
  }
}
