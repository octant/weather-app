/* globals fetch */
import React, { Component } from 'react'
import './App.css'
import './css/weather-icons.css'
import Weather from './Weather'
import Main from './Main'
import SearchResults from './SearchResults'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      url: 'http://api.openweathermap.org/data/2.5/weather',
      appid: '2bc782ac273d090fe409ddf32b73cc9c',
      id: '6141439',
      city: '',
      units: 'C',
      data: {},
      fetched: false,
      searchResults: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.selectCity = this.selectCity.bind(this)
  }

  componentDidMount () {
    this.fetchWeather()
  }

  fetchWeather () {
    fetch(`${this.state.url}?id=${this.state.id}&appid=${this.state.appid}`)
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
    this.setState(
      {[e.target.name]: e.target.value}, () => {
        fetch(`http://localhost:4000/cities?name=${this.state.city}`)
          .then(response => response.json())
          .then((json) => {
            this.setState(() => ({searchResults: json}))
          })
      })
  }

  selectCity (id) {
    this.setState(() => ({
      id,
      searchResults: [],
      city: ''
    }), () => {
      this.handleClick()
    })
  }

  handleClick () {
    this.fetchWeather()
  }

  render () {
    return (
      <div className='container'>
        <div className='column'>
          <h1>Weather App</h1>
          <input onChange={this.handleChange} type='text' value={this.state.city} name='city' />
          <select onChange={this.handleChange} name='units' value={this.state.units}>
            <option value={'C'}>&#8451;</option>
            <option value={'F'}>&#x2109;</option>
            <option value={'K'}>&#8490;</option>
          </select>
          <h2>{this.state.data.name}</h2>
          {this.state.fetched
            ? <div>
              {this.state.data.weather.map((period, i) => (
                <Weather key={i} weather={period} />
              ))}
              <Main main={this.state.data.main} units={this.state.units} />
            </div>
            : <p>Loading...</p>
          }
        </div>
        <div className='column'>
          <SearchResults selectMethod={this.selectCity} results={this.state.searchResults} />
        </div>
      </div>
    )
  }
}

export default App
