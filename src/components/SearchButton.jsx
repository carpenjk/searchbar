import React from 'react'
import ActionButton from '../base/ActionButton'

const SearchButton = (props) => (
  <ActionButton tw={{ variant: 'search' }} {...props}>
    Search
  </ActionButton>
)

export default SearchButton
