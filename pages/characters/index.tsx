import { ChangeEvent, useEffect, useState } from 'react'
import {
  CharactersDataType,
  CharactersType,
  RelLinksType,
} from '../../helpers/types'
import {
  takeCharactersData,
  takeLinks,
  replaceQuery,
  replaceSearchParams,
} from '../../helpers/utils'
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import { Box, Container } from '@material-ui/core'
import { TablePaginationActions } from '../../components/TablePaginationActions'
import { useRouter } from 'next/router'
import { CharactersTable } from '../../components/Table/CharactersTable'
import { FilterBar } from '../../components/FilterBar'
import { MainLayout } from '../../layouts/MainLayout'
import { fetchCharacterData } from '../../helpers/api'
import { useCallback } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      padding: theme.spacing(4),
    },
  })
)
type GenderType = 'male' | 'female' | ''

export default function Home({
  characters,
  links,
  queryPage,
  queryPageSize,
  gender,
  name,
}) {
  const [relLinks, setRelLinks] = useState<RelLinksType | undefined>(links)
  const [charactersData, setCharactersData] = useState<
    CharactersDataType[] | undefined
  >(characters)

  const [isFetchingPage, setIsFetchingPage] = useState<boolean>(false)

  const classes = useStyles()
  const [page, setPage] = React.useState(queryPage - 1)
  const [rowsPerPage, setRowsPerPage] = React.useState(queryPageSize)
  const [nameValue, setNameValue] = useState(name)
  const [genderValue, setGenderValue] = useState<GenderType>(gender)
  const router = useRouter()

  const pagesAmount: number = relLinks
    ? +relLinks.last.match(/page=\d+/)[0].replace(/page=/, '')
    : 0

  const getCharacters = async (): Promise<void> => {
    const queryName = replaceSearchParams('name', nameValue)
    const queryGender = replaceSearchParams('gender', genderValue)
    router.push(
      `/characters?page=${
        page + 1
      }&pageSize=${rowsPerPage}${queryGender}${queryName}`
    )
    const data = await fetchCharacterData(
      page + 1,
      rowsPerPage,
      queryName,
      queryGender
    )
    setRelLinks(data.links)
    setCharactersData(data.characters)
    setIsFetchingPage(false)
  }

  const handleChangeSelect = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>): void => {
      setPage(0)
      setGenderValue(event.target.value as GenderType)
      setIsFetchingPage(true)
    },
    [setPage, setGenderValue, setIsFetchingPage]
  )

  const handleSearchByName = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
      setNameValue(e.target.value)
    },
    [setNameValue]
  )

  const searchByName = useCallback((): void => {
    setPage(0)
    setIsFetchingPage(true)
  }, [setPage, setIsFetchingPage])

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, newPage: number): void => {
      setPage(newPage)
      setIsFetchingPage(true)
    },
    [setPage, setIsFetchingPage]
  )

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
      setIsFetchingPage(true)
    },
    [setRowsPerPage, setPage, setIsFetchingPage]
  )

  useEffect((): void => {
    if (isFetchingPage) {
      getCharacters()
    }
  }, [isFetchingPage])

  return (
    <>
      <MainLayout title='characters'>
        <Container maxWidth='md'>
          {charactersData && (
            <Box pt={3}>
              <Paper className={classes.paper}>
                <FilterBar
                  nameValue={nameValue}
                  handleSearchByName={handleSearchByName}
                  searchByName={searchByName}
                  genderValue={genderValue}
                  handleChangeSelect={handleChangeSelect}
                />
                <CharactersTable charactersData={charactersData} />
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20, 25]}
                  component='div'
                  count={pagesAmount * rowsPerPage}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </Paper>
            </Box>
          )}
        </Container>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const name: string = query.name
  const gender: string = query.gender
  const page: string = query.page
  const pageSize: string = query.pageSize
  const queryPage: number = replaceQuery(page, 1)
  const queryPageSize: number = replaceQuery(pageSize, 10)
  const queryName: string = replaceSearchParams('name', name)
  const queryGender: string = replaceSearchParams('gender', gender)
  const url = `https://anapioficeandfire.com/api/characters?page=${queryPage}&pageSize=${queryPageSize}${queryName}${queryGender}`
  const res = await fetch(url)

  const data: CharactersType[] = await res.json()
  const rowLinks = res.headers.get('link')

  const characters: CharactersDataType[] = data && takeCharactersData(data)

  const links: RelLinksType = rowLinks && takeLinks(rowLinks)
  return {
    props: {
      characters,
      links,
      queryPage,
      queryPageSize,
      gender: gender ?? queryGender,
      name: name ?? queryName,
    },
  }
}
