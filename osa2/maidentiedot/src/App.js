import React, {useState, useEffect} from 'react';
import axios from 'axios'



const CountriesShown = ({filteredCountries,}) => {

  const [selectedCountry, setSelectedCountry] = useState(undefined)
  
  const GetCountries = () => {
    if (selectedCountry) {
      return [selectedCountry]
    }
    return (
      filteredCountries
    )
  }

  if (filteredCountries.length > 10) {
    return (<p>too many matches, specify another filter</p> )
  } else {
    return (
    <div>
      {filteredCountries.map((country, i)=>
        <li key={i}>
          {country.name}
          <button onClick={() => {
            setSelectedCountry(country)
          }}>
            paina
          </button>
        </li>
      )}
      <CountryInformation filteredCountries={GetCountries()}/>
      <FlagToShow filteredCountries={GetCountries()}/>
    </div>
    )
  }
}



const CountryInformation = ({filteredCountries}) => {
  console.log(filteredCountries)
  const country = filteredCountries[0]
  if(filteredCountries.length === 1) {
    return (
      <div>    
        <h2>{country.name}</h2>
        capital {country.capital}
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((language, i)=>
          <li key={i}>
            {language.name}
          </li>
          )} 
        </ul>
      </div>
    )
  } else {
    return (
      null
    )
  }
}

const FlagToShow = ({filteredCountries}) => {
  if(filteredCountries.length === 1) {
    const country = filteredCountries[0]
    const urlFlag = country.flag 
    return (
      <div>
        <img src={urlFlag} alt='flag of country' width='200' height='141'/>
      </div>
    )
  } else {
    return (
      null
    )
  }
}

    

const App = () => {
  const [filterString, setFilterString] = useState('')
  const [countries, setCountries] = useState([])


useEffect(() => {
  console.log('effect')
  axios
  .get ('https://restcountries.eu/rest/v2/all')
  .then(response => {
    console.log('promise fulfilled')
    setCountries(response.data)
  })
}, [])



const handleFilterChange = (event) => {
  setFilterString(event.target.value)
}

const filteredCountries = countries.filter(country =>{
  if(filterString) {     
    return country.name.includes(filterString)
  }
  return true
})  



return (
  <div>
    find countries:
    <form>
      <input
      value={filterString}
      onChange={handleFilterChange}
      />
    </form>
    <CountriesShown filteredCountries={filteredCountries} />
  </div>
)
}

export default App;
