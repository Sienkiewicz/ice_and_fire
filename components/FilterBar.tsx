import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { ChangeEvent, FC, memo, ReactElement } from 'react'

type Props = {
  nameValue: string
  genderValue: string
  handleSearchByName(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void
  searchByName(): void
  handleChangeSelect(event: React.ChangeEvent<{ value: unknown }>): void
}

export const FilterBar: FC<Props> = memo(
  ({
    nameValue,
    handleSearchByName,
    searchByName,
    genderValue,
    handleChangeSelect,
  }: Props): ReactElement => {
    return (
      <Grid container justify='space-between' spacing={2}>
        <Grid item xs={12} sm={8}>
          <FormControl variant='outlined' fullWidth>
            <InputLabel htmlFor='search by name'>
              Find Name
            </InputLabel>
            <OutlinedInput
              id='search'
              type='text'
              value={nameValue}
              onChange={handleSearchByName}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='search button' onClick={searchByName}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
            <FormHelperText>you need to write a full name</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant='outlined'>
            <Select
              value={genderValue}
              onChange={handleChangeSelect}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value=''>
                <em>Choose gender</em>
              </MenuItem>
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
)
