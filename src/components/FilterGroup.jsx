import React from 'react'
import styled from 'styled-components'
import {
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft
} from '@carpenjk/themeweaver'
import { breakpoint } from '@carpenjk/prop-x/css'
import FilterHeader from './FilterHeader'

const StyledFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${getMarginTop('searchBar_container.filterGroup', '4rem')};
  margin-right: ${getMarginRight('searchBar_container.filterGroup', '0')};
  margin-bottom: ${getMarginBottom('searchBar_container.filterGroup', '0')};
  margin-left: ${getMarginLeft('searchBar_container.filterGroup', '0')};
  padding-top: ${getPaddingTop('searchBar_container.filterGroup', '0')};
  padding-right: ${getPaddingRight('searchBar_container.filterGroup', '0')};
  padding-bottom: ${getPaddingBottom(
    'searchBar_container.filterGroup',
    '1.6rem'
  )};
  padding-left: ${getPaddingLeft('searchBar_container.filterGroup', '0')};
`
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${breakpoint(1)`
    flex-direction: row;
  `}
`

const FilterGroup = ({ children, title }) => (
  <StyledFilterGroup key="wrapper">
    <FilterHeader headerText={title} key="title" />
    <FilterContainer>{children}</FilterContainer>
  </StyledFilterGroup>
)

export default FilterGroup
