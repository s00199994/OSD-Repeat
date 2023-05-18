import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gun } from 'src/app/interfaces/gun';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  endpoint = 'https://firearm-storage-app.herokuapp.com/firearms';

  constructor(private http: HttpClient) { }

  getLocker(): Observable<Gun[]> {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');

    return this.http
      .get<any[]>(this.endpoint + '/', { headers })
      .pipe(
        map((data) => (
          data.map((item) => ({
            id: item._id,
            logNumber: item.logNumber,
            owner: item.owner,
            make: item.make,
            model: item.model,
            type: item.type,
            serialNumber: item.serialNumber
          })
          ))
        )
      )
  }

  addFirearm(firearm: Gun): Observable<any> {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')

    return this.http.post(this.endpoint + '/create', firearm, { headers });
  }

  deleteFirearm(gun: Gun): Observable<any> {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');

    const deleteURL = this.endpoint + '/' + gun.id;

    return this.http.delete(deleteURL, { headers });
  }

  editFirearm(gun: Gun): Observable<any> {
    const params = { id: gun.id }

    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');

    const editURL = this.endpoint + '/' + gun.id;

    const body = { 
      logNumber: gun.logNumber, 
      owner: gun.owner, 
      make: gun.make, 
      model: gun.model, 
      type: gun.type, 
      serialNumber: gun.serialNumber 
    }

    return this.http.put(editURL, body, { headers })
  }
}
