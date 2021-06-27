import styled from 'styled-components'

export const Main = styled('div')`
  font-family: inherit;
`

export const DropDownContainer = styled('div')`
  width: 98%;
  margin: 0 auto;
`

export const DropDownHeader = styled('div')`
  font-weight: 500;
  font-size: 1.3rem;
  color: #a5a5a5;
`

export const DropDownListContainer = styled('div')`
  position: absolute;
  z-index: 100;
  justify-content: space-around;
  //width: 10.5em;
`

export const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #7e7e7e;
  font-size: 1rem;
  &:first-child {
    padding-top: 0.8em;
  }
`

export const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.8em;
  display: flex;
  &:hover {
    color: #fd9e46;
  }
`
