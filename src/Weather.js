import React from 'react'

const Weather = ({weather}) => (
  <p><strong>{weather.main}</strong>: {weather.description}</p>
)

export default Weather
