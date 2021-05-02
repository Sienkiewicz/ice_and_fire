import {
  BookType,
  CharactersDataType,
  CharactersType,
  HeadCell,
  RelLinksType,
} from './types'

const booksId = (arr: string[]): { id: number; url: string }[] => {
  const books = arr.map(str => {
    const id = +str.match(/\d+$/)[0]
    return { id, url: str }
  })
  return books
}

const concatNameAndAliases = (name: string, aliases: string[]): string => {
  const aliasesStr = aliases.length && aliases.join(', ')
  if (name && aliasesStr) {
    return `${name}, ${aliasesStr}`
  }
  return name ? `${name}` : `${aliasesStr}`
}

const replacer = (arg: string): string => {
  return arg ? arg : 'Unknown'
}

export const takeCharactersData = (
  data: CharactersType[]
): CharactersDataType[] => {
  return data.map(person => ({
    name: concatNameAndAliases(person.name, person.aliases),
    gender: replacer(person.gender),
    books: booksId(person.books),
    culture: replacer(person.culture),
    tvSeries: person.tvSeries.join(', '),
  }))
}

export const takeLinks = (str: string): RelLinksType => {
  const relReg = /^\w+=['"]/g
  const quoteReg = /['"]$/g
  const lessThenReg = /^</g
  const greatThenReg = />$/g

  const arrOfLinks = str
    .split(', ')
    .map(str => str.split('; '))
    .map(l => {
      const arg1 = l[1].replace(relReg, '').replace(quoteReg, '')
      const arg2 = l[0].replace(lessThenReg, '').replace(greatThenReg, '')

      return [arg1, arg2]
    })

  const links = Object.fromEntries(arrOfLinks)

  return links
}

export const replaceQuery = (
  query: string | undefined,
  number: number
): number => {
  const result = query ?? (isNaN(+query) ? number : +query)
  return +result
}

export const replaceSearchParams = (
  name: string,
  arg: string | undefined
): string => {
  if (name === 'gender') {
    const a = arg ? (arg === 'male' || 'female' ? `&${name}=${arg}` : '') : ''
    return a
  }
  return arg && arg !== '' ? `&${name}=${arg}` : ''
}
