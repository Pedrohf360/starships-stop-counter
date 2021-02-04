import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl: string = 'swapi.dev/api/';

  constructor(public http: HttpClient) { }

  doHeaders() {
    const headerVals: any = {};
    return new HttpHeaders(headerVals);
  }

  doGet(url: string) {
    return new Promise((resolve, reject) => {
      const headers = this.doHeaders();

      return this.http.get(this.apiUrl + url, { headers }).subscribe(
        (data) => {
          resolve(data);
        },

        (error) => {
          reject(error);
        }
      );
    });
  }
}
