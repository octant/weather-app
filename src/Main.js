import React from 'react'

class Main extends React.Component {
  render () {
    return (
      <p>min: {this.props.main.temp_min} max: {this.props.main.temp_max} current: {this.props.main.temp}
      </p>
    )
  }
}

export default Main
