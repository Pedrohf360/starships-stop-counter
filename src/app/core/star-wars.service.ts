import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService extends BaseService {

  hoursByDay: number = 24;
  daysByPeriod: Object = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
  };

  constructor(public http: HttpClient) {
    super(http);
  }

  getStarshipsData(page: number = 1) {
    return this.doGet(`/starships/?page=${page}`);
  }

  searchStarships(starshipModelName: string, page: number = 1) {
    return this.doGet(`/starships/?search=${starshipModelName}&page=${page}`);
  }

  getStopsNumberByMGLT(totalDistanceMGLT: number, MGLTShip: number, consumable: string): number {
    const totalHours: number = this.getHours(totalDistanceMGLT, MGLTShip);
    const days: number = this.getDays(totalHours);
    const totalStops: number = this.getTotalStops(days, consumable);

    return Math.floor(totalStops);
  }

  getHours(totalDistance: number, distancePerHour: number): number {
    if (!totalDistance || !distancePerHour) {
      return;
    }

    return totalDistance / distancePerHour;
  }

  getDays(totalHours: number): number {
    if (!totalHours) {
      return;
    }

    return totalHours / this.hoursByDay;
  }

  getTotalStops(days: number, consumable: string): number {
    if (!days || !consumable) {
      return;
    }

    const consumableDays = this.getDaysFromConsumable(consumable);

    return days / consumableDays;
  }

  getNumericValueFromConsumable(consumable: string): number {
    if (!consumable) {
      return;
    }

    const consumableSplitted = consumable.split(' ')[0];

    return parseFloat(consumableSplitted[0]);
  }

  getPeriodValueFromConsumable(consumable: string): string {
    if (!consumable) {
      return;
    }

    const consumablePeriod = consumable.split(' ')[1];

    return consumablePeriod.replace('s', '');
  }

  getDaysFromConsumable(consumable: string): number {
    if (!consumable) {
      return;
    }

    const consumableNumber = this.getNumericValueFromConsumable(consumable);
    let consumablePeriod = this.getPeriodValueFromConsumable(consumable);

    return consumableNumber * this.daysByPeriod[consumablePeriod];
  }
}
