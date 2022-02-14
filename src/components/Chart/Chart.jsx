import React, { useEffect, useState} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

//Change versions for reach-chartjs-2 and chartjs

const Chart = ( { data, country }) => {

  const [dailyData, setDailyData] = useState([]);

  //Must create new function inside useEffect for async await
  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData();
      const dailyData = initialDailyData.reverse();
      setDailyData(dailyData);
    }

    fetchAPI();
    
  }, [])

  const barChart = (
    data.confirmed ?
    (<Bar 
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(0, 0, 255, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(255, 0, 0, 0.5)',
          ],
          data:[data.confirmed.value, data.recovered.value, data.deaths.value]
        }]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}`}
      }}
    />) : null
  )

  //labes and data use destructuring
  //For dates can use toLocaleDateString() or toDateString()

  const lineChart = (
    dailyData.length ? 
      (<Line 
      data={{
          labels: dailyData.map(({ date }) => new Date(date).toDateString()),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }],
        }}

    />) : null
  )


  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;