import { Toolbar, Typography, Button, Box } from '@material-ui/core'
import { FC, ReactElement } from 'react'
import Link from 'next/link'

type Props = {
  title: string
}

export const EnhancedTableToolbar: FC<Props> = ({
  title,
}: Props): ReactElement => {
  return (
    <Toolbar>
      <Box width='100%' display='flex' justifyContent='space-between'>
        <Typography variant='h6' id='tableTitle' component='div'>
          {title.toUpperCase()}
        </Typography>
        <Link href='/'>
          <Button variant='outlined' color='inherit'>
            home
          </Button>
        </Link>
      </Box>
    </Toolbar>
  )
}
