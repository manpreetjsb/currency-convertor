import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { FormHolder, SwitchIconGrid } from './exchangeView.styles'
import IconButton from '@material-ui/core/IconButton'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Typography } from '@material-ui/core'
import ReactFlagsSelect from 'react-flags-select'
import axios from 'axios'

interface Icurrency {
  code: string
  name: string
  symbol: boolean
}

interface ICountryDetail {
  id: number
  name: string
  isoAlpha2: string
  isoAlpha3: string
  isoNumeric: 51
  currency: Icurrency
  flag: string
}

interface ICountryDetailWithRate extends ICountryDetail {
  currencyCode: number
}

const intialState = {
  to: '',
  toRate: 0,
  toCurrencyName: '',
  from: '',
  fromRate: 0,
  fromCurrencyName: '',
  fromCountrySymbol: '',
}

let fromRate = 0
let toRate = 0
let toCurrencyName = ''
let fromCountrySymbol = ''
let fromCurrencyName = ''
let FinalCountryList: any[] = []

const ExchangeView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(intialState)
  const [amount, setAmount] = useState(1)
  const [swap, setSwap] = useState(false)

  const [num, setNum] = useState(0)

  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')
  const [countryCode, setCountryCode] = useState<any[]>([])

  const onSelectFlagFrom = (countryCode: any) => {
    const rates = FinalCountryList.filter(
      (item) => item.isoAlpha2 === countryCode
    )
    console.log(rates)
    fromRate = rates[0].currencyCode
    fromCountrySymbol = rates[0].currency.symbol
    fromCurrencyName = rates[0].currency.name

    //console.log('fromRate', fromRate)
    setSelectedOption({
      ...selectedOption,
      fromRate: fromRate,
      fromCurrencyName: fromCurrencyName,
      fromCountrySymbol: fromCountrySymbol,
    })
    setSelectedFrom(countryCode)
  }

  const onSelectFlagTo = (countryCode: any) => {
    const rates = FinalCountryList.filter(
      (item) => item.isoAlpha2 === countryCode
    )
    toRate = rates[0].currencyCode
    toCurrencyName = rates[0].currency.name

    //console.log('fromRate', fromRate)
    setSelectedOption({
      ...selectedOption,
      toRate: toRate,
      toCurrencyName: toCurrencyName,
    })
    setSelectedTo(countryCode)
  }

  useEffect(() => {
    getCurrencyCode()
  }, [])

  useEffect(() => {
    if (swap) {
      console.log('swap', swap)
      setSwap(false)
    }
  }, [swap, setSwap])

  const getCurrencyCode = async () => {
    const ratsesURL =
      'https://openexchangerates.org/api/latest.json?app_id=5af728ce333b4723b1246b11baac56f9'
    const CountryDetailURL =
      'https://gist.githubusercontent.com/portapipe/a28cd7a9f8aa3409af9171480efcc090/raw/297c47670ce73d5a04c3306e38eb18e91edb709d/countries.json'

    const getRateJson = await axios.get(ratsesURL)
    const getCountryDetailJson = await axios.get(CountryDetailURL)

    const currencyCodeRateData = getRateJson.data.rates
    const currencyCodes = Object.keys(currencyCodeRateData)
    //console.log('currencyCodes', currencyCodes)
    //console.log('rateData', rateData)

    const CountryCodeFromList = getCountryDetailJson.data.map(
      (a: ICountryDetail) => a.isoAlpha2
    )

    setCountryCode(CountryCodeFromList)
    //console.log('CountryCodeFromList', CountryCodeFromList)
    /*     console.log(currencyCodes.length)
    console.log(CountryList.length) */

    const results = getCountryDetailJson.data
      .map((item: ICountryDetail) => {
        const currencyCodeName = item.currency.code
        const key = currencyCodes.indexOf(currencyCodeName)

        if (key > 0) {
          if (item.currency.code === currencyCodes[key]) {
            return {
              ...item,
              currencyCode: currencyCodeRateData[currencyCodeName],
            }
          }
        }
      })
      .filter((item: ICountryDetail) => item !== undefined)
    //console.log('results', results)
    FinalCountryList = results
  }

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
          <ReactFlagsSelect
            selected={selectedFrom}
            //onSelect={onSelect}
            id='from'
            searchable={false}
            countries={countryCode}
            onSelect={onSelectFlagFrom}
          />
        </Grid>
        <SwitchIconGrid item sm={1} xs={2}>
          <IconButton aria-label='delete' onClick={() => setSwap(true)}>
            <SwapHorizIcon />
          </IconButton>
        </SwitchIconGrid>
        <Grid item sm={4} xs={10}>
          <ReactFlagsSelect
            selected={selectedTo}
            id='to'
            //onSelect={onSelect}
            searchable={false}
            countries={countryCode}
            onSelect={onSelectFlagTo}
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
