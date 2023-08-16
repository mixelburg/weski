export const msToTime = (ms) => {
  const seconds = (ms / 1000).toFixed(1)
  const minutes = (ms / (1000 * 60)).toFixed(1)
  const hours = (ms / (1000 * 60 * 60)).toFixed(1)
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1)
  if (parseInt(seconds) < 60) return seconds + ' sec'
  else if (parseInt(minutes) < 60) return minutes + ' min'
  else if (parseInt(hours) < 24) return hours + ' hrs'
  else return days + ' dys'
}
