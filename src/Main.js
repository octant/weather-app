import React from 'react'

class Main extends React.Component {
  convert (temp, unit) {
    switch (unit) {
      case 'C':
        const celcius = Math.round((temp - 273) * 10) / 10
        return <span>{celcius} &#8451;</span>
      case 'F':
        const fahrenheit = Math.round((temp * (9 / 5) - 459.67) * 10) / 10
        return <span>{fahrenheit} &#x2109;</span>
      default:
        return <span>{temp} &#8490;</span>
    }
  }

  render () {
    const {units, main: {temp, temp_min, temp_max}} = this.props
    return (
      <p>
        min: {this.convert(temp_min, units)}  max: {this.convert(temp_max, units)} current: {this.convert(temp, units)}
      </p>
    )
  }
}

export default Main
