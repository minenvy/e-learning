export function minusTwoDatesInMilliseconds(date1: Date | string, date2?: Date | string) {
  const firstDate = new Date(date1)
  const secondDate = date2 ? new Date(date2) : new Date()
  return Math.abs(firstDate.getTime() - secondDate.getTime())
}
