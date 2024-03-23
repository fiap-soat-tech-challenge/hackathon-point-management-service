export class Data {
  static newDate(): Date {
    const currentDate = new Date();
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
  }

  static newDateTime(): Date {
    const currentDate = new Date();
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
    );
  }
}
