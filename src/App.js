import React, { useEffect, useState } from 'react';
import { Cards, Chart, CountryPicker } from './components/index'
import styles from './App.module.css';
import { fetchData } from './api';
import image from './images/image.png';

function App() {

  const [state, setState] = useState({
    data: {},
    country: '',
  })
//Cannot use regular async/await when working with useEffect.
//See in Chart component
  useEffect(() => {
    fetchData()
    .then((fetchedData) => {
      setState({
        data: fetchedData
      })
    })
    
  }, [])

  const handleCountryChange = async (country) => {
    console.log(country)
    const fetchedData = await fetchData(country);
    setState({
      data: fetchedData,
      country: country
    })
  }

  //Below is with setting up APP as a class
  // state = {
  //   data: {},
  // }

  // async componentDidMount() {
  //   const fetchedData = await fetchData();
  
  //   this.setState({ data: fetchedData})
  
  // }

    
  
  
    const { data, country } = state
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    )
}

export default App;