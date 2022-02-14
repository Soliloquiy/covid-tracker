import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'
const dailyurl = 'https://api.covidtracking.com/v1/us/'

//When using async/await instead of then/catch
// use try and catch for success/error handling
export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }

  try{
    // const response = await axios.get(url);

    //Can destructure above to get data directly:
    // const { data } = await axios.get(url)

    // const modifiedData = {
    //   confirmed: data.confirmed,
    //   recovered: data.recovered,
    //   deaths: data.deaths,
    //   lastUpdate: data.lastUpdate,
    // }

    //Can destructure above even further:
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
    //When key and value are the same, do not need to write
    // key:value, can just write key
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    }

  } catch (error) {
    return error
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${dailyurl}/daily.json`)
    
    //Use parantheses after arrow to return data as objects
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.positive,
      deaths: dailyData.death,
      date: dailyData.date
    }))

    return modifiedData

  } catch (error) {
    return error
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name)
  } catch(error) {
    return error
  }
}