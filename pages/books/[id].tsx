import React, { FC, ReactElement } from 'react'
import { BookType } from '../../helpers/types'
import { MainLayout } from '../../layouts/MainLayout'
import Container from '@material-ui/core/Container'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { bookCell } from '../../helpers/constants'

type Props = {
  data: BookType
}

const index: FC<Props> = ({ data }: Props): ReactElement => {
  return (
    <MainLayout title={`${data.name}`}>
      <Container maxWidth='md'>
        <Box display='flex' width='100%' justifyContent='center' pt={2}>
          <Box width={{ xs: '100%', md: '50%' }}>
            <Paper>
              <Table>
                <TableBody>
                  {bookCell.map((col, i) => (
                    <TableRow key={i}>
                      <TableCell variant='head'>{col[1]}</TableCell>
                      <TableCell>
                        {col[2] === 'string'
                          ? data[col[0]]
                          : new Date(data[col[0]]).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default index

export async function getServerSideProps({ params }) {
  const id: string = params.id
  const url: string = `https://www.anapioficeandfire.com/api/books/${id}`
  const res: Response = await fetch(url)
  const data: BookType = await res.json()
  return {
    props: { data },
  }
}
