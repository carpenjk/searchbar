import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import { getBackgroundColor, getPaddingBottom, getPaddingLeft, getPaddingRight, getPaddingTop } from '@carpenjk/themeweaver'

const StyledMenuContainer = styled.div`
  overflow-y: visible;
  background-color: ${getBackgroundColor({}, 'initial')};
  padding-top: ${getPaddingTop({}, '0px')};
  padding-right: ${getPaddingRight({}, '0px')};
  padding-bottom: ${getPaddingBottom({}, '0px')};
  padding-left: ${getPaddingLeft({}, '0px')};
  ${condition('isFiltersOpen')`
    overflow-y: auto;
    background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, 'initial')};
    padding-top: ${getPaddingTop({ suffix: '-isFiltersOpen' }, '0px')};
    padding-right: ${getPaddingRight({ suffix: '-isFiltersOpen' }, '0px')};
    padding-bottom: ${getPaddingBottom({ suffix: '-isFiltersOpen' }, '0px')};
    padding-left: ${getPaddingLeft({ suffix: '-isFiltersOpen' }, '0px')};
  `}

  ${breakpoint(1)`
    display: flex;
    flex-direction: column;
    ${condition('isFiltersOpen')`
      background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, 'initial')};
      padding-top: ${getPaddingTop({ suffix: '-isFiltersOpen' }, '8px')};
      padding-right: ${getPaddingRight({ suffix: '-isFiltersOpen' }, '8px')};
      padding-bottom: ${getPaddingBottom({ suffix: '-isFiltersOpen' }, '8px')};
      padding-left: ${getPaddingLeft({ suffix: '-isFiltersOpen' }, '8px')};
    `}
  `}
`
const DEFAULT_TW = {
  semKey: 'searchBar__inputContainer'
}

const MenuContainer = ({ children, isFiltersOpen, isSearchBarFocused, menuContainerRef, tw }) => {
  return (
    <StyledMenuContainer
      ref={menuContainerRef}
      tw={{ ...DEFAULT_TW, ...tw }}
      isFiltersOpen={isFiltersOpen}
      isSearchBarFocused={isSearchBarFocused}
    >
      {children}
    </StyledMenuContainer>
  )
}

export default MenuContainer
