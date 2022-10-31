import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import { getBackgroundColor, getPaddingBottom, getPaddingLeft, getPaddingRight, getPaddingTop } from '@carpenjk/themeweaver'

const StyledFiltersContainer = styled.div`
  display: none;
  background-color: ${getBackgroundColor({}, 'initial')};
  padding-top: ${getPaddingTop({}, '0')};
  padding-right: ${getPaddingRight({}, '0')};
  padding-bottom: ${getPaddingBottom({}, '0')};
  padding-left: ${getPaddingLeft({}, '0')};
  ${condition('isSearchFiltersOpen')`
    display: flex;
  `}

  flex-direction: column;
  flex: none;
  overflow-x: hidden;
  ${condition('isScrollable')`
    overflow-y: scroll;
    overflow-y:auto;
  `}
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;

  ${breakpoint(1)`
    flex: none;
    overflow-y: hidden;
    background-color: ${getBackgroundColor({}, 'initial')};
    padding-top: ${getPaddingTop({}, '0')};
    padding-right: ${getPaddingRight({}, '0')};
    padding-bottom: ${getPaddingBottom({}, '0')};
    padding-left: ${getPaddingLeft({}, '0')};
    ${condition('isScrollable')`
      overflow-y: scroll;
      overflow-y:auto;
    `}
  `}
`
StyledFiltersContainer.defaultProps = {
  tw: { semKey: 'searchBar__filtersContainer' }
}

const FiltersContainer = ({ children, isSearchFiltersOpen, isScrollable }) => (
  <StyledFiltersContainer
    isSearchFiltersOpen={isSearchFiltersOpen}
    isScrollable={isScrollable}
  >
    {children}
  </StyledFiltersContainer>
)

export default FiltersContainer
