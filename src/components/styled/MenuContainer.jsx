import React, { useRef } from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import { getBackgroundColor, getPaddingBottom, getPaddingLeft, getPaddingRight, getPaddingTop } from '@carpenjk/themeweaver'

const StyledMenuContainer = styled.div`
  overflow-y: auto;
  background-color: ${getBackgroundColor({}, 'initial')};
  padding-top: ${getPaddingTop({}, '0')};
  padding-right: ${getPaddingRight({}, '0')};
  padding-bottom: ${getPaddingBottom({}, '0')};
  padding-left: ${getPaddingLeft({}, '0')};
  ${condition('isFiltersOpen')`
    background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, 'initial')};
    padding-top: ${getPaddingTop({ suffix: '-isFiltersOpen' }, '4px')};
    padding-right: ${getPaddingRight({ suffix: '-isFiltersOpen' }, '4px')};
    padding-bottom: ${getPaddingBottom({ suffix: '-isFiltersOpen' }, '4px')};
    padding-left: ${getPaddingLeft({ suffix: '-isFiltersOpen' }, '4px')};
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
