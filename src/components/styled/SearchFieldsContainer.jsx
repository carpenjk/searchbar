import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'

const StyledSearchFields = styled.div`
  display: flex;
  flex-direction: column;
  ${condition('isSearchFiltersOpen')`
    margin-bottom: 20px;
  `}
  ${props => breakpoint(props.breakpointToWrap)`
    flex-direction: row;
  `}
`

const SearchFieldsContainer = ({ breakpointToWrap, isFiltersOpen, children }) => (
  <StyledSearchFields breakpointToWrap={breakpointToWrap} isSearchFiltersOpen={isFiltersOpen}>
    {children}
  </StyledSearchFields>
)

export default SearchFieldsContainer
