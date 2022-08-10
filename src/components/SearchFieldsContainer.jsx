import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'

const StyledSearchFields = styled.div`
  display: flex;
  flex-direction: column;
  ${condition('isSearchFiltersOpen')`
    margin-bottom: 20px;
  `}
  ${breakpoint(1)`
    flex-direction: row;
  `}
`

const SearchFieldsContainer = ({ isFiltersOpen, children }) => (
  <StyledSearchFields isSearchFiltersOpen={isFiltersOpen}>
    {children}
  </StyledSearchFields>
)

export default SearchFieldsContainer
