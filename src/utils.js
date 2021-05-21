// date is a PlainDate
export function getDayAxisIndex(date, swdi) {
  const di = date.toJSDate().getUTCDay();
  return (swdi <= di ? 0 : 7) + di - swdi;
};

export function getMaxWeekAxisIndex(startDate, endDate, swdi) {
  return Math.ceil((getDayAxisIndex(startDate, swdi) +
                    startDate.diff(endDate)) / 7) - 1;
}

export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getWeekDayNames(swdi) {
  let seq = [swdi];
  for (let i = 1; i < 7; i++) {
    if (seq[i - 1] < 6) seq.push(seq[i - 1] + 1); 
    else seq.push(0);
  }
  return seq.map(i => dayNames[i]);
}
