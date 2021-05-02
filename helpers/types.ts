export type CharactersDataType = {
  name: string
  gender: string
  books: { id: number; url: string }[]
  culture: string
  tvSeries: string
}

export type CharactersType = {
  url: string
  name: string
  gender: string
  culture: string
  born: string
  died: string
  titles: string[]
  aliases: string[]
  father: string
  mother: string
  spouse: string
  allegiances: string[]
  books: string[]
  povBooks: any[]
  tvSeries: string[]
  playedBy: string[]
}

export type RootType = {
  books: string
  characters: string
  houses: string
}

export type BookType = {
  url: string
  name: string
  isbn: string
  authors: string[]
  numberOfPages: number
  publisher: string
  country: string
  mediaType: string
  released: string
  characters: string[]
  povCharacters: string[]
}

export type RelLinksType = {
  next?: string | undefined
  prev?: string | undefined
  first?: string | undefined
  last?: string | undefined
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof CharactersDataType
  label: string
  numeric: boolean
}
