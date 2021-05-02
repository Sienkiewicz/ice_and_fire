import { AppBar, LinearProgress, makeStyles } from '@material-ui/core'
import Head from 'next/head'
import React, { FC, ReactElement } from 'react'
import { EnhancedTableToolbar } from '../components/EnhancedTableToolbar'

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flexGrow: 1,
  },
})

type Props = {
  title: string
  children: ReactElement
}

export const MainLayout: FC<Props> = ({
  title,
  children,
}: Props): ReactElement => {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
      </Head>
      <nav>
        <AppBar position='static'>
          <EnhancedTableToolbar title={title} />
        </AppBar>
      </nav>
      <main id='main' className={classes.main}>{children}</main>
    </div>
  )
}
