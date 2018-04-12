/* globals fetch */
import React, { Component } from 'react'
import './App.css'
import './css/weather-icons.css'
import Weather from './Weather'
import Main from './Main'
import countries from './countries'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      url: 'http://api.openweathermap.org/data/2.5/weather',
      appid: '2bc782ac273d090fe409ddf32b73cc9c',
      city: 'Sault Ste. Marie',
      country: 'CA',
      data: {},
      fetched: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.fetchWeather()
  }

  fetchWeather () {
    fetch(`${this.state.url}?q=${this.state.city},${this.state.country}&appid=${this.state.appid}`)
      .then((response) => {
        if (response.status === 200) {
          return response
        } else {
          throw new Error(response.statusText)
        }
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState(() => ({error: '', data: json, fetched: true}))
      })
      .catch((error) => {
        this.setState(() => ({error, data: {}, fetched: false}))
      })
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleClick (e) {
    this.fetchWeather()
  }

  render () {
    return (
      <div className='container'>
        <h1>Weather App</h1>
        <input onChange={this.handleChange} type='text' value={this.state.city} name='city' />
        <select onChange={this.handleChange} name='country' value={this.state.country}>
          {countries.map((country) => {
            return <option key={country.code} value={country.code}>{country.code}</option>
          })}
        </select>
        <button onClick={this.handleClick}>Search</button>
        <h2>{this.state.data.name}</h2>
        {this.state.fetched
          ? <div>
            {this.state.data.weather.map((period, i) => (
              <Weather key={i} weather={period} />
            ))}
            <Main main={this.state.data.main} units='C' />
          </div>
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

export default App
