export function textToLink(name: string) {
  const pattern = /[,.:'/]/g
  return name.toLowerCase().replaceAll(pattern, "").replaceAll(" ", "-")
}
