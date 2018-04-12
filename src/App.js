/* globals fetch */
import React, { Component } from 'react'
import './App.css'
import './css/weather-icons.css'
import Weather from './Weather'
import Main from './Main'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      url: 'http://api.openweathermap.org/data/2.5/weather',
      appid: '2bc782ac273d090fe409ddf32b73cc9c',
      city: '',
      data: {},
      fetched: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleChange (e) {
    this.setState({city: e.target.value})
  }

  handleClick (e) {
    console.log(this.state.city)
  }

  render () {
    return (
      <div className='container'>
        <h1>Weather App</h1>
        <input onChange={this.handleChange} type='text' value={this.state.city} name='city' />
        <button onClick={this.handleClick}>Search</button>
        <h2>{this.state.data.name}</h2>
        {this.state.fetched
          ? <div>
            {this.state.data.weather.map((period, i) => (
              <Weather key={i} weather={period} />
            ))}
            <Main main={this.state.data.main} />
          </div>
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

export default App
