import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { useCallback } from 'react'

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
)

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

export function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1()
  const theme = useTheme()
  const {
    count,
    page,
    rowsPerPage,
    onChangePage,
  }: TablePaginationActionsProps = props

  const handleFirstPageButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      onChangePage(event, 0)
    },
    [onChangePage]
  )

  const handleBackButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      onChangePage(event, page - 1)
    },
    [page, onChangePage]
  )

  const handleNextButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      onChangePage(event, page + 1)
    },
    [page, onChangePage]
  )

  const handleLastPageButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    },
    [count, rowsPerPage, onChangePage]
  )

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}
