export function date(date?: string): string {
  const d = new Date(date || "");
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  return `${day}.${month}.${d.getFullYear()}`
}

export function toNumber(x: string | number): number {
  if(typeof x === 'string') {
    return +x
      .replaceAll(new RegExp(/[\sa-zA-Zа-яА-Я]+/, "g"), '')
      .replaceAll(new RegExp(/,/, "g"), '.');
  }
  return x;
}