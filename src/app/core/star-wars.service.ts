import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getStarshipsData(page: number = 1) {
    return this.doGet(`/starships/?page=${page}`);
  }
}
