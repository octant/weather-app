import React from 'react'

const SearchResults = ({selectMethod, results}) => {
  return (
    <div>
      {results.map((result) => {
        return (
          <Result clickMethod={selectMethod} key={result.id} city={result} />
        )
      })}
    </div>
  )
}

class Result extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.clickMethod(e.currentTarget.id)
  }

  render () {
    const {city} = this.props
    return (
      <div className='search-result' onClick={this.handleClick} id={city.id}>
        <h3>{city.name}, {city.country}</h3>
      </div>
    )
  }
}

export default SearchResults
