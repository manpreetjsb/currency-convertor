import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactFlagsSelect from 'react-flags-select'

interface props {
  direction: string
  setSelectedOption: (x: any) => void
  selectedOption: any
  swap: any
  setSwap: (x: any) => void
}
let fromRate = 0
let toRate = 0
let toCurrencyName = ''
let fromCountrySymbol = ''
let fromCurrencyName = ''
let CountryList: any[] = []
let FinalCountryList: any[] = []

const DropDown: React.FC<props> = ({
  direction,
  setSelectedOption,
  selectedOption,
  swap,
  setSwap,
}) => {
  const [selected, setSelected] = useState('')
  const [countryCode, setCountryCode] = useState<any[]>([])

  const onSelectFlag = (countryCode: any) => {
    //console.log(direction)

    const rates = FinalCountryList.filter(
      (item) => item.isoAlpha2 === countryCode
    )
    //console.log(rates[0])

    if (direction === 'from') {
      fromRate = rates[0].currencyCode
      fromCountrySymbol = rates[0].currency.symbol
      fromCurrencyName = rates[0].currency.name
    }
    if (direction === 'to') {
      toRate = rates[0].currencyCode
      toCurrencyName = rates[0].currency.name
    }

    //console.log('fromRate', fromRate)
    setSelectedOption({
      ...selectedOption,
      [direction]: countryCode,
      toRate: toRate,
      fromRate: fromRate,
      toCurrencyName: toCurrencyName,
      fromCurrencyName: fromCurrencyName,
      fromCountrySymbol: fromCountrySymbol,
    })
    setSelected(countryCode)
    // console.log(selectedOption)
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
    const one =
      'https://openexchangerates.org/api/latest.json?app_id=5af728ce333b4723b1246b11baac56f9'
    const two =
      'https://gist.githubusercontent.com/portapipe/a28cd7a9f8aa3409af9171480efcc090/raw/297c47670ce73d5a04c3306e38eb18e91edb709d/countries.json'

    const requestOne = await axios.get(one)
    const requestTwo = await axios.get(two)

    const data = requestOne.data.rates
    const currencyCodes = Object.keys(data)
    //console.log('currencyCodes', currencyCodes)
    //console.log('data', data)

    CountryList = requestTwo.data

    const CountryCodeFromList = CountryList.map((a) => a.isoAlpha2)
    setCountryCode(CountryCodeFromList)
    //console.log('CountryCodeFromList', CountryCodeFromList)
    /*     console.log(currencyCodes.length)
    console.log(CountryList.length) */

    const results = CountryList.map((item: any) => {
      const currencyCodeName = item.currency.code
      const key = currencyCodes.indexOf(currencyCodeName)

      if (key > 0) {
        if (item.currency.code === currencyCodes[key]) {
          return {
            ...item,
            currencyCode: data[currencyCodeName],
          }
        }
      }
    }).filter((item) => item !== undefined)
    //console.log('results', results)
    FinalCountryList = results
  }

  /*   const onListClick = (currencyName: string, currencyCode: string) => () => {
    setSelectedOption({ ...selectedOption, [direction]: currencyName })
    setIsOpen(false)
  } */
  return (
    <div className='App'>
      <ReactFlagsSelect
        selected={selected}
        //onSelect={onSelect}
        searchable={false}
        countries={countryCode}
        onSelect={onSelectFlag}

        /* {...selectedOption[direction]} */
      />
    </div>
  )
}
export default DropDown
