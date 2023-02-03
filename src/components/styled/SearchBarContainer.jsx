import React from 'react'
import styled from 'styled-components'

import {
  getBackgroundColor,
  getBorderRadius,
  getWidth,
  getMaxHeight,
  getMaxWidth,
  getHeight,
  getPaddingRight,
  getPaddingTop,
  getPaddingLeft,
  getPaddingBottom
} from '@carpenjk/themeweaver'
import { breakpoint, condition, getProp } from '@carpenjk/prop-x/css'
import useHasVerticalScrollbar from '../hooks/useHasVerticalScrollbar'

const StyledSearchBar = styled.div`
  flex: none;
  position: absolute;
  top: ${getProp('offsetTop')}px;
  left: 50%;
  display: flex;
  flex-direction: column;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  box-sizing: content-box;
  background-color: ${getBackgroundColor({}, 'transparent')};
  border-radius: ${getBorderRadius({}, '8px')};
  width: ${getWidth({}, 'auto')};
  height: ${getHeight({}, 'auto')};
  max-height: ${getMaxHeight({}, '82vh')};
  max-width: ${getMaxWidth({}, 'none')};
  z-index: 999999;
  padding-top: ${getPaddingTop({}, '8px')};
  padding-right: ${getPaddingRight({}, '8px')};
  padding-bottom: ${getPaddingBottom({}, '8px')};
  padding-left: ${getPaddingLeft({}, '8px')};

  ${condition('hide')`
    display: none;
  `}


  ${condition('isSecondaryOpen')`
    background-color: ${getBackgroundColor({ suffix: '-isSecondaryOpen' }, '#F6FEFF')};
    width: ${getWidth({ suffix: '-isSecondaryOpen' })};
    height: ${getHeight({ suffix: '-isSecondaryOpen' })};
    max-width: ${getMaxWidth({ suffix: '-isSecondaryOpen' })};
    max-height: ${getMaxHeight({ suffix: '-isSecondaryOpen' })};
  `}

  
  ${condition('isOpen')`
    left: calc(50% + ${getProp('padding-right')});
    background-color: ${getBackgroundColor({ suffix: '-isOpen' }, '#F6FEFF')};
    width: ${getWidth({ suffix: '-isOpen' }, '90vw')};
    height: ${getHeight({ suffix: '-isOpen' }, 'auto')};
    max-height: ${getMaxHeight({ suffix: '-isOpen' })};
    max-width: ${getMaxWidth({ suffix: '-isOpen' }, 'none')};
  `}

  ${condition('isFiltersOpen')`
    background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, '#F6FEFF')};
    width: ${getWidth({ suffix: '-isFiltersOpen' })};
    height: ${getHeight({ suffix: '-isFiltersOpen' })};
    max-width: ${getMaxWidth({ suffix: '-isFiltersOpen' })};
    max-height: ${getMaxHeight({ suffix: '-isFiltersOpen' })};
  `} 

  ${condition('hasVerticalScrollbar')`
      padding-right: 0px;
      width: calc(${getWidth({}, '90vw')} + ${getPaddingRight({}, '8px')});
      width: calc(${getWidth({ suffix: 'isOpen' })} + ${getPaddingRight({})});
      width: calc(${getWidth({ suffix: 'isSecondaryOpen' })} + ${getPaddingRight({})});
      width: calc(${getWidth({ suffix: 'isFiltersOpen' })} + ${getPaddingRight({})});
    `}

  ${breakpoint(1)`
    top: ${getProp('offsetTop')}px;
    padding-top: ${getPaddingTop({}, '8px')};
    padding-right: ${getPaddingRight({}, '8px')};
    padding-bottom: ${getPaddingBottom({}, '8px')};
    padding-left: ${getPaddingLeft({}, '8px')};
    background-color: ${getBackgroundColor({}, '#F6FEFF')};
    width: ${getWidth({}, 'auto')};
    max-width: ${getMaxWidth({}, 'none')};
    max-Height: ${getMaxHeight({}, '82vh')};
    border-radius: ${getBorderRadius({}, '8px')};

    ${condition('hide')`
      display: none;
    `}
    
    

    ${condition('isSecondaryOpen')`
        background-color: ${getBackgroundColor({ suffix: '-isSecondaryOpen' }, '#F6FEFF')};
        width: ${getWidth({ suffix: '-isSecondaryOpen' })};
        height: ${getHeight({ suffix: '-isSecondaryOpen' })};
        max-width: ${getMaxWidth({ suffix: '-isSecondaryOpen' })};
        max-height: ${getMaxHeight({ suffix: '-isSecondaryOpen' })};
    `}
  
    ${condition('isOpen')`
      background-color: ${getBackgroundColor({ suffix: '-isOpen' }, '#F6FEFF')};
      width: ${getWidth({ suffix: '-isOpen' })};
      height: ${getHeight({ suffix: '-isOpen' }, 'auto')};
      max-height: ${getMaxHeight({ suffix: '-isOpen' })};
      max-width: ${getMaxWidth({ suffix: '-isOpen' })};
    `}

    ${condition('isFiltersOpen')`
      background-color: ${getBackgroundColor({ suffix: '-isFiltersOpen' }, '#F6FEFF')};
      width: ${getWidth({ suffix: '-isFiltersOpen' })};
      height: ${getHeight({ suffix: '-isFiltersOpen' })};
      max-width: ${getMaxWidth({ suffix: '-isFiltersOpen' })};
      max-height: ${getMaxHeight({ suffix: '-isFiltersOpen' })};
    `}

    ${condition('hasVerticalScrollbar')`
      padding-right: 0px;
      width: calc(${getWidth({}, 'auto')} + ${getPaddingRight({}, '8px')});
      width: calc(${getWidth({ suffix: '-isSecondaryOpen' })} + ${getPaddingRight({}, '8px')});
      width: calc(${getWidth({ suffix: '-isOpen' })} + ${getPaddingRight({}, '8px')});
      width: calc(${getWidth({ suffix: '-isFiltersOpen' })} + ${getPaddingRight({}, '8px')});
      width: calc(${getWidth({ suffix: '-hasVerticalScrollbar' })} + ${getPaddingRight({}, '8px')});
      max-width: calc(${getMaxWidth({}, 'none')} + ${getPaddingRight({}, '8px')});
      max-width: calc(${getMaxWidth({ suffix: '-isSecondaryOpen' })} + ${getPaddingRight({}, '8px')});
      max-width: calc(${getMaxWidth({ suffix: '-isOpen' })} + ${getPaddingRight({}, '8px')});
      max-width: calc(${getMaxWidth({ suffix: '-isFiltersOpen' })} + ${getPaddingRight({}, '8px')});
      max-width: calc(${getMaxWidth({ suffix: '-hasVerticalScrollbar' })} + ${getPaddingRight({}, '8px')});
    `}
`}
`

const DEFAULT_TW = {
  semKey: 'searchBar'
}

StyledSearchBar.defaultProps = {
  position: 'absolute'
}

const SearchBarContainer = (props) => {
  const {
    children,
    isHidden,
    isOpen,
    isFiltersOpen,
    isSecondaryOpen,
    isSearchBarFocused,
    offsetTop,
    tw,
    searchBarRef,
    searchBarId,
    menuContainerRef
  } = props
  const mergedTW = { ...DEFAULT_TW, ...tw }
  const scrollElement = menuContainerRef?.current
  const containerElement = searchBarRef?.current

  const hasVerticalScrollbar = useHasVerticalScrollbar({ scrollElement, containerElement, deps: [isOpen, isSecondaryOpen, isFiltersOpen] })

  return (
    <StyledSearchBar
      id={searchBarId}
      tw={mergedTW}
      isOpen={isOpen}
      isFiltersOpen={isFiltersOpen}
      isSearchBarFocused={isSearchBarFocused}
      isSecondaryOpen={isSecondaryOpen}
      offsetTop={offsetTop}
      hide={isHidden}
      ref={searchBarRef}
      hasVerticalScrollbar={hasVerticalScrollbar}
    >
      {children}
    </StyledSearchBar>
  )
}

export default SearchBarContainer
