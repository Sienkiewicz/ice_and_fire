import { TableCell, TableHead, TableRow } from '@material-ui/core'
import { FC, ReactElement } from 'react'
import { HeadCell } from '../../helpers/types'

type Props = {
  headers: HeadCell[]
}

export const EnhancedTableHead: FC<Props> = ({ headers }: Props): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        {headers.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
