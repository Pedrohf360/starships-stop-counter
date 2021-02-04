import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasepageService {

  hoursByDay: number;
  daysByPeriod: Object = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
  };

  constructor() { }

  getStopsNumberByMGLT(totalDistanceMGLT: number, MGLTShip: number, consumable: string): number {
    const totalHours: number = this.getHours(totalDistanceMGLT, MGLTShip);
    const days: number = this.getDays(totalHours);
    const stops: number = this.getStops(days, consumable);
    const totalStops: number = this.getFinalStops(stops, consumable);

    return totalStops;
  }

  getHours(totalDistance: number, distancePerHour: number): number {
    if (!totalDistance || !distancePerHour) {
      console.error('days or consumable don\'t exist');
      return;
    }

    return totalDistance / distancePerHour;
  }

  getDays(totalHours: number): number {
    if (!totalHours) {
      console.error('totalHours or consumable don\'t exist');
      return;
    }

    return totalHours / this.hoursByDay;
  }

  getStops(days: number, consumable: string): number {
    if (!days || !consumable) {
      console.error('days or consumable don\'t exist');
      return;
    }

    const consumableDays = this.getDaysFromConsumable(consumable);

    return days / consumableDays;
  }

  getFinalStops(stopsQuant: number, consumable: string): number {
    if (!stopsQuant || !consumable) {
      console.error('stopsQuant or consumable don\'t exist');
      return;
    }

    const consumableNumber = this.getNumericValueFromConsumable(consumable);

    return stopsQuant / consumableNumber;
  }

  getNumericValueFromConsumable(consumable: string): number {
    if (!consumable) {
      console.error('consumable don\'t exist');
      return;
    }

    const consumableSplitted = consumable.split(' ')[0];

    return parseFloat(consumableSplitted[0]);
  }

  getPeriodValueFromConsumable(consumable: string): string {
    if (!consumable) {
      console.error('consumable don\'t exist');
      return;
    }

    const consumableSplitted = consumable.split(' ')[1];

    return consumableSplitted[1].replace('s', '');
  }

  getDaysFromConsumable(consumable: string): number {
    if (!consumable) {
      console.error('consumable don\'t exist');
      return;
    }

    const consumableNumber = this.getNumericValueFromConsumable(consumable);
    let consumablePeriod = this.getPeriodValueFromConsumable(consumable);

    return consumableNumber * this.daysByPeriod[consumablePeriod];
  }
}
