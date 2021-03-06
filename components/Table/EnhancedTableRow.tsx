import { IconButton, TableCell, TableRow } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, ReactElement, useCallback } from 'react'
import { CharactersDataType } from '../../helpers/types'

type Props = {
  classes: {
    table: string
    row: string
    cell: string
  }
  row: CharactersDataType
}

export const EnhancedTableRow: FC<Props> = ({
  classes,
  row,
}: Props): ReactElement => {
  const router = useRouter()

  const handleClick = useCallback(
    (id: number): void => {
      router.push({
        pathname: '/books/[id]',
        query: { id },
      })
    },
    [router]
  )
  return (
    <TableRow hover className={classes.row} tabIndex={-1}>
      <TableCell
        className={classes.cell}
        component='th'
        id={row.name}
        scope='row'
        padding='none'
      >
        {row.name}
      </TableCell>
      <TableCell align='right'>{row.gender}</TableCell>
      <TableCell align='right'>
        {row.books.map(
          (book, i): ReactNode => {
            return (
              <IconButton
                key={book.id}
                size='small'
                onClick={() => handleClick(book.id)}
              >
                {book.id}
              </IconButton>
            )
          }
        )}
      </TableCell>
      <TableCell align='right'>{row.culture}</TableCell>
      <TableCell className={classes.cell} align='right'>
        {row.tvSeries}
      </TableCell>
    </TableRow>
  )
}
