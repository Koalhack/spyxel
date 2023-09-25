//INFO: Format the time (Y-m-d H:M:S)
export function formatTime(time) {
  const format = {
    day: String(time.getDate()).padStart(2, '0'),
    month: String(time.getMonth() + 1).padStart(2, '0'),
    year: String(time.getFullYear()).padStart(4, '0'),
    hours: String(time.getHours()).padStart(2, '0'),
    minutes: String(time.getMinutes()).padStart(2, '0'),
    seconds: String(time.getSeconds()).padStart(2, '0')
  };

  return `${format.year}-${format.month}-${format.day} ${format.hours}:${format.minutes}:${format.seconds}`;
}
