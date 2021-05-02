import { HeadCell } from './types'

export const charactersHeadCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name, Aliases ',
  },
  { id: 'gender', numeric: true, disablePadding: false, label: 'Gender' },
  { id: 'books', numeric: true, disablePadding: false, label: 'Books ID' },
  { id: 'culture', numeric: true, disablePadding: false, label: 'Culture' },
  {
    id: 'tvSeries',
    numeric: true,
    disablePadding: false,
    label: 'TV Series',
  },
]

export const bookCell = [
  ['name', 'Name', 'string'],
  ['isbn', 'ISBN', 'string'],
  ['numberOfPages', 'Number of pages', 'string'],
  ['released', 'Release date', 'date'],
]
