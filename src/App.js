/* globals fetch */
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      url: 'http://api.openweathermap.org/data/2.5/weather',
      appid: '2bc782ac273d090fe409ddf32b73cc9c',
      data: {},
      fetched: false
    }
  }

  componentDidMount () {
    fetch(`${this.state.url}?q=London,ca&appid=${this.state.appid}`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState(({data}) => ({data: json, fetched: true}))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h1>Weather App</h1>
        <h2>{this.state.data.name}</h2>
      </div>
    )
  }
}

export default App
