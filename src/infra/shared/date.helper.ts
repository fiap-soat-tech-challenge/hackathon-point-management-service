export class DateHelper {
  public static dataAtual(): Date {
    return new Date();
  }

  public static datasSaoIguais(data1: Date, data2: Date): boolean {
    return data1.valueOf() === data2.valueOf();
  }

  public static getDateFixedTime(data: Date): Date {
    return new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate(),
      0,
      0,
      0,
      0,
    );
  }
}
