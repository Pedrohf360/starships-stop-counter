import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasepageService {

  hoursByDay: number = 24;
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
    const totalStops: number = this.getTotalStops(days, consumable);

    return Math.floor(totalStops);
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

  getTotalStops(days: number, consumable: string): number {
    if (!days || !consumable) {
      console.error('days or consumable don\'t exist');
      return;
    }

    const consumableDays = this.getDaysFromConsumable(consumable);

    return days / consumableDays;
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

    const consumablePeriod = consumable.split(' ')[1];

    return consumablePeriod.replace('s', '');
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
