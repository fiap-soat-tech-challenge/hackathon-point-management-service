import { DateTime } from 'luxon';

export class DataConverter {
  static dateToISOString(date: Date): DateTime {
    return DateTime.fromJSDate(date, { zone: 'America/Sao_Paulo' });
  }
}
