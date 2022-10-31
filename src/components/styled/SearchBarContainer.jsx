import React from 'react'
import styled from 'styled-components'
import {
  getBackgroundColor,
  getBorderRadius,
  getWidth,
  getMaxHeight,
  getMaxWidth,
  getMinWidth
} from '@carpenjk/themeweaver'
import { breakpoint, condition, getProp } from '@carpenjk/prop-x/css'

const StyledSearchBar = styled.div`
  flex: none;
  position: absolute;
  top: ${getProp('offsetTop')}px;
  left: ${getProp('offsetLeft')};
  display: flex;
  flex-direction: column;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  box-sizing: content-box;
  background-color: transparent;
  border-radius: ${getBorderRadius({}, '8px')};
  max-height: ${getMaxHeight({}, '82vh')};
  max-width: ${getMaxWidth({}, 'none')};
  width: ${getWidth({}, 'auto')};
  z-index: 999999;

  ${condition('hide')`
    display: none;
  `}

  ${condition('isSecondaryOpen')`
    background-color: ${getBackgroundColor({}, '#F6FEFF')};
    max-width: ${getProp('openMaxWidth')};
  `}

  ${condition('isFiltersOpen')`
    width: ${getWidth({}, '90vw')};
    max-width: ${getProp('openMaxWidth')};
    max-height: ${getMaxHeight({}, '82vh')};
  `} 

  ${breakpoint(1)`
    top: ${getProp('offsetTop')}px;
    padding: 0;
    background-color: ${getBackgroundColor({}, '#F6FEFF')};
    width: ${getWidth({}, 'auto')};
    max-width: ${getMaxWidth({}, 'none')};
    min-width: ${getMinWidth({}, '0')};
    border-radius: ${getBorderRadius({}, '8px')};

    ${condition('hide')`
      display: none;
    `}

    ${condition('isSearchBarFocused')`
      max-width: ${getProp('openMaxWidth')};
    `}

    ${condition('isFiltersOpen')`
      width: ${getWidth({}, '90vw')};
      max-width: ${getProp('openMaxWidth')};
      max-height: ${getMaxHeight({}, '82vh')};
    `}  
`}
`

const DEFAULT_TW = {
  semKey: 'searchBar'
}

StyledSearchBar.defaultProps = {
  position: 'absolute',
  offsetLeft: '50%'
}

const SearchBarContainer = (props) => {
  const {
    children,
    isHidden,
    isFiltersOpen,
    isSecondaryOpen,
    isSearchBarFocused,
    offsetTop,
    openMaxWidth,
    tw,
    searchBarRef
  } = props
  const mergedTW = { ...DEFAULT_TW, ...tw }
  return (
    <StyledSearchBar
      tw={mergedTW}
      isFiltersOpen={isFiltersOpen}
      isSearchBarFocused={isSearchBarFocused}
      isSecondaryOpen={isSecondaryOpen}
      offsetTop={offsetTop}
      openMaxWidth={openMaxWidth}
      hide={isHidden}
      ref={searchBarRef}
    >
      {children}
    </StyledSearchBar>
  )
}

export default SearchBarContainer
