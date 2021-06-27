import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { FormHolder, SwitchIconGrid } from './exchangeView.styles'
import IconButton from '@material-ui/core/IconButton'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import DropDown from './dropdown/dropdown'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Typography } from '@material-ui/core'

const intialState = {
  to: '',
  toRate: 0,
  toCurrencyName: '',
  from: '',
  fromRate: 0,
  fromCurrencyName: '',
  fromCountrySymbol: '',
}

const ExchangeView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(intialState)
  const [amount, setAmount] = useState(1)
  const [swap, setSwap] = useState(false)

  const [num, setNum] = useState(0)

  const calculate = async () => {
    const FromRate = selectedOption.fromRate
    const ToRate = selectedOption.toRate

    setNum((ToRate / FromRate) * amount)
  }

  const handleAmountChange = (e: { target: { value: any } }) => {
    setAmount(e.target.value)
  }

  return (
    <Box>
      <FormHolder container spacing={2}>
        <Grid item sm={3} xs={12}>
          <TextField
            fullWidth
            id='outlined-basic'
            variant='outlined'
            value={amount}
            onChange={handleAmountChange}
            placeholder='1'
            size='small'
            InputLabelProps={{ shrink: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  {selectedOption.fromCountrySymbol}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <DropDown
            direction='from'
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            swap={swap}
            setSwap={setSwap}
          />
        </Grid>
        <SwitchIconGrid item sm={1} xs={2}>
          <IconButton aria-label='delete' onClick={() => setSwap(true)}>
            <SwapHorizIcon />
          </IconButton>
        </SwitchIconGrid>
        <Grid item sm={4} xs={10}>
          <DropDown
            direction='to'
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            swap={swap}
            setSwap={setSwap}
          />
        </Grid>
        <Box mt={2} mb={1} ml={1} mr={1} width={1}>
          <Grid
            container
            spacing={2}
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item sm={8}>
              {num && (
                <Typography>
                  {amount} {selectedOption.from}{' '}
                  {selectedOption.fromCurrencyName} = {num} {selectedOption.to}{' '}
                  {selectedOption.toCurrencyName}
                </Typography>
              )}
            </Grid>
            <Grid item sm={4}>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => calculate()}
                >
                  Convert
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormHolder>
    </Box>
  )
}

export default ExchangeView
