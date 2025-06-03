import moment from "moment";

const time = {
  checkIfExistZero: (data: string): string => {
    if (data.length === 1) {
      const newData = `0${data}`;
      return newData;
    }
    return data;
  },

  date: (value?: string | Date): Date => (value ? new Date(value) : new Date()),

  datePlusMinutes: (minutes: number): Date => new Date(new Date().getTime() + 1000 * 60 * minutes),

  date2String(date: string | Date, withTime?: boolean, dateSymbol?: string): string {
    const newDate = this.date(date);
    let day = `${newDate.getDate()}`;
    let month = `${newDate.getMonth() + 1}`;
    const year = `${newDate.getFullYear()}`;
    let hour = `${newDate.getHours()}`;
    let minutes = `${newDate.getMinutes()}`;
    let seconds = `${newDate.getSeconds()}`;

    day = this.checkIfExistZero(day);
    month = this.checkIfExistZero(month);
    hour = this.checkIfExistZero(hour);
    minutes = this.checkIfExistZero(minutes);
    seconds = this.checkIfExistZero(seconds);
    if (withTime) return `${day}${dateSymbol}${month}${dateSymbol}${year} ${hour}:${minutes}:${seconds}`;
    return `${day}${dateSymbol}${month}${dateSymbol}${year}`;
  },

  date2mmYYYY(date: string | Date, dateSymbol: string = "/"): string {
    const newDate = this.date(date);

    let month = `${newDate.getMonth() + 1}`;
    const year = `${newDate.getFullYear()}`;
    let hour = `${newDate.getHours()}`;
    let minutes = `${newDate.getMinutes()}`;
    let seconds = `${newDate.getSeconds()}`;

    month = this.checkIfExistZero(month);
    hour = this.checkIfExistZero(hour);
    minutes = this.checkIfExistZero(minutes);
    seconds = this.checkIfExistZero(seconds);
    return `${month}${dateSymbol}${year}`;
  },

  isExpired(pastDate: string | Date): boolean {
    const _currentDate = this.date();
    const _pastDate = this.date(pastDate);
    if (_currentDate >= _pastDate) {
      return true;
    }
    return false;
  },
  diffTime(date: moment.MomentInput): string {
    const createdAt = moment(date);
    const now = moment();
    const diffDays = now.diff(createdAt, "days");

    if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;
    }
    const diffHours = now.diff(createdAt, "hours");
    if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
    }
    const diffMinutes = now.diff(createdAt, "minutes");

    return `${diffMinutes} ${diffMinutes === 1 ? "minuto" : "minutos"}`;
  },
};

export default time;
