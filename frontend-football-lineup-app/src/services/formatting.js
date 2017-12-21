export function formatTime(time) {
  return parseInt(time.substring(0,2)) > 12 ? `at ` + (parseInt(time.substring(0,2)) - 12) + (time.substring(2)) + ` pm` : time
}
