import { BookType, CharactersType, RelLinksType } from './types'
import { takeCharactersData, takeLinks } from './utils'


export const fetchCharacterData = async (
  page: number = 1,
  pageSize: number = 10,
  queryName: string,
  queryGender: string
) => {
  const url = `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}${queryName}${queryGender}`
  const res = await fetch(url)

  const data: CharactersType[] = await res.json()
  const rowLinks = res.headers.get('link')

  const characters = data && takeCharactersData(data)

  const links: RelLinksType = rowLinks && takeLinks(rowLinks)
  return { characters, links }
}

export const fetchBook = async (
  url = `https://www.anapioficeandfire.com/api/books/1/asdlfkasl`
) => {
  try {
    const res = await fetch(url)
    if (res.ok) {
      const data: BookType = await res.json()
      return data
    }
    return { error: res.status }
  } catch (e) {
    console.log('Error', e)
  }
}
