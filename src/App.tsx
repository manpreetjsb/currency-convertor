import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ExchangeView from './components/exchangeView'

const App: React.FC = () => (
  <Container>
    <header>
      <Box m={5} justifyContent='center' display='flex'>
        <Typography variant='h3'>Currency Convertor</Typography>
      </Box>
    </header>
    <ExchangeView />
  </Container>
)

export default App
