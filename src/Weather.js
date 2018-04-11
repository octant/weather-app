import React from 'react'
import icons from './icon-mappings'

const Weather = ({weather}) => (
  <p><i className={`wi wi-${icons[weather.id]}`} /> {weather.description}</p>
)

export default Weather
