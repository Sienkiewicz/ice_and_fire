import { Table, TableBody, TableCell, Typography } from '@material-ui/core'
import React, { FC, ReactElement } from 'react'
import { EnhancedTableHead } from './EnhancedTableHead'
import { EnhancedTableRow } from './EnhancedTableRow'
import { makeStyles } from '@material-ui/core/styles'
import { charactersHeadCells } from '../../helpers/constants'
import { CharactersDataType } from '../../helpers/types'
import { memo } from 'react'
import { ReactNode } from 'react'

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
  row: {
    '&:hover': {
      height: 70,
    },
  },
  cell: {
    width: 200,
  },
})

type Props = {
  charactersData: CharactersDataType[] | undefined
}

export const CharactersTable: FC<Props> = memo(
  ({ charactersData }: Props): ReactElement => {
    const classes = useStyles()
    return (
      <Table
        className={classes.table}
        aria-labelledby='tableTitle'
        size='medium'
        aria-label='enhanced table'
      >
        <EnhancedTableHead headers={charactersHeadCells} />
        <TableBody>
          {charactersData.length ? (
            charactersData.map(
              (row: CharactersDataType, index: number): ReactNode => (
                <EnhancedTableRow key={index} classes={classes} row={row} />
              )
            )
          ) : (
            <TableCell colSpan={charactersHeadCells.length}>
              <Typography variant='body1' align='center' color='initial'>
                No matches
              </Typography>
            </TableCell>
          )}
        </TableBody>
      </Table>
    )
  }
)
