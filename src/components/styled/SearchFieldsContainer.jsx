import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import { getBackgroundColor, getPaddingBottom, getPaddingLeft, getPaddingRight, getPaddingTop, getMarginBottom } from '@carpenjk/themeweaver'

const StyledSearchFields = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${getBackgroundColor({}, 'initial')};
  padding-top: ${getPaddingTop({}, '0')};
  padding-right: ${getPaddingRight({}, '0')};
  padding-bottom: ${getPaddingBottom({}, '0')};
  padding-left: ${getPaddingLeft({}, '0')};

  ${condition('isSearchFiltersOpen')`
    background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, 'initial')};
    padding-top: ${getPaddingTop({ suffix: '-isFiltersOpen' }, '0')};
    padding-right: ${getPaddingRight({ suffix: '-isFiltersOpen' }, '0')};
    padding-bottom: ${getPaddingBottom({ suffix: '-isFiltersOpen' }, '0')};
    padding-left: ${getPaddingLeft({ suffix: '-isFiltersOpen' }, '0')};
    margin-bottom: ${getMarginBottom({ suffix: '-isFiltersOpen' }, '20px')};
  `}

  ${props => breakpoint(props.breakpointToWrap)`
    flex-direction: row;
  `}

  ${breakpoint(1)`
    padding-top: ${getPaddingTop({}, '0')};
    padding-right: ${getPaddingRight({}, '0')};
    padding-bottom: ${getPaddingBottom({}, '0')};
    padding-left: ${getPaddingLeft({}, '0')};
    ${condition('isSearchFiltersOpen')`
      background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, 'initial')};
      padding-top: ${getPaddingTop({ suffix: '-isFiltersOpen' }, '0')};
      padding-right: ${getPaddingRight({ suffix: '-isFiltersOpen' }, '0')};
      padding-bottom: ${getPaddingBottom({ suffix: '-isFiltersOpen' }, '0')};
      padding-left: ${getPaddingLeft({ suffix: '-isFiltersOpen' }, '0')};
      margin-bottom: ${getMarginBottom({ suffix: '-isFiltersOpen' }, '20px')};
    `}
  `}
  
`
StyledSearchFields.defaultProps = {
  tw: { semKey: 'searchBar__searchFieldsContainer' }
}

const SearchFieldsContainer = ({ breakpointToWrap, isFiltersOpen, children }) => (
  <StyledSearchFields breakpointToWrap={breakpointToWrap} isSearchFiltersOpen={isFiltersOpen}>
    {children}
  </StyledSearchFields>
)

export default SearchFieldsContainer
