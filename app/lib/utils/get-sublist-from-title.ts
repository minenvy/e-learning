import subList from "@/app/data/sub-list.json"

type SubList = {
  main: string
  sub: string[]
}

export function getSubListFromTitle(title: string) {
  return subList.find((item) => item.main === title) as SubList
}
