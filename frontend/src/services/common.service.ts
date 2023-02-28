export const takenTimeStr = (val: number) => {
    let str: string = '';
    let h: number = 0;
    let m: number = 0;
    let s: number = 0;
    val = val / 1000;
    m = Math.floor(val / 60);
    s = Math.round(val % 60);
    str = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s === 0 ? 1 : s}`;
    return str;
}

export const dateToStr = (date: Date) => {
    const t = new Date(date);
    const y = t.getFullYear();
    const m = t.getMonth() + 1;
    const d = t.getDate();
    const hh = t.getHours();
    const mm = t.getMinutes();
    const ss = t.getSeconds();
    return `${y}/${m < 10 ? '0' : ''}${m}/${d < 10 ? '0' : ''}${d} ${hh < 10 ? '0' : ''}${hh}:${mm < 10 ? '0' : ''}${mm}:${ss < 10 ? '0' : ''}${ss}`
}
  