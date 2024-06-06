import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const Countries = (countries) => {
  const countriesToShow = countries.countries

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countriesToShow.length > 1) {
    return countriesToShow.map(country => {
      return (
        <div key={country.name.common}>
          {country.name.common}
        </div>
      )
    })
  }

  if (countriesToShow.length === 1) {
    return countriesToShow.map(country => {
      return (
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p style={{ margin: 0 }}>capital {country.capital}</p>
          <p style={{ margin: 0 }}>area {country.area}</p>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt='flag' width='200' />
        </div>
      )
    })
  }
}


function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter
  ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  : countries


  return (
    <>
    <Filter 
      newFilter={newFilter} 
      handleFilterChange={handleFilterChange} 
    />

    
    <Countries countries={countriesToShow} />
    </>
  )
}

export default App
