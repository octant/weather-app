/* globals fetch */
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  componentDidMount () {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London,ca&appid=2bc782ac273d090fe409ddf32b73cc9c')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h1>Weather App</h1>
      </div>
    )
  }
}

export default App
