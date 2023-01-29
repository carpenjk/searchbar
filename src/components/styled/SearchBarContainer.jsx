import React, { useCallback, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import {
  getBackgroundColor,
  getBorderRadius,
  getWidth,
  getMaxHeight,
  getMaxWidth,
  getHeight,
  getPaddingRight
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
  background-color: transparent;
  border-radius: ${getBorderRadius({}, '8px')};
  width: ${getWidth({}, 'auto')};
  height: ${getHeight({}, 'auto')};
  max-height: ${getMaxHeight({}, '82vh')};
  max-width: ${getMaxWidth({}, 'none')};
  z-index: 999999;

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
    max-width: ${getMaxWidth({ suffix: '-isFiltersOpen' })}};
    max-height: ${getMaxHeight({ suffix: '-isFiltersOpen' })};
  `} 

  ${breakpoint(1)`
    top: ${getProp('offsetTop')}px;
    padding: 0;
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
      max-width: ${getMaxWidth({ suffix: '-isFiltersOpen' })}};
      max-height: ${getMaxHeight({ suffix: '-isFiltersOpen' })};
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
    menuContainerRef
  } = props
  const mergedTW = { ...DEFAULT_TW, ...tw }
  const scrollElement = menuContainerRef?.current
  const theme = useTheme()
  const isWidthAdjusted = useRef(false)

  const adjustWidth = useCallback((needsAdjust) => {
    const setIsWidthAdjusted = (bln) => {
      isWidthAdjusted.current = bln
    }
    console.log('adjustWidth start')
    if (searchBarRef.current) {
      const currentStyles = searchBarRef?.current ? window?.getComputedStyle(searchBarRef.current) : undefined
      console.log('🚀 ~ file: SearchBarContainer.jsx:138 ~ adjustWidth ~ currentStyles', currentStyles)
      const currWidth = parseFloat(currentStyles.width)
      const currLeft = parseFloat(currentStyles.left)
      const adjustValue = parseInt(getPaddingRight({}, 8)({ theme, tw: mergedTW }))
      if (needsAdjust && !isWidthAdjusted.current) {
        console.log('adjusting width:', (currWidth + adjustValue) + 'px')
        searchBarRef.current.style.width = (currWidth + adjustValue) + 'px'
        searchBarRef.current.style.maxWidth = (currWidth + adjustValue) + 'px'
        searchBarRef.current.style.left = (currLeft + adjustValue) + 'px'
        setIsWidthAdjusted(true)
        return
      }
      if (isWidthAdjusted.current) {
        console.log('adjusting width:', (currWidth - adjustValue) + 'px')
        searchBarRef.current.style.width = (currWidth - adjustValue) + 'px'
        searchBarRef.current.style.maxWidth = (currWidth - adjustValue) + 'px'
        searchBarRef.current.style.left = (currLeft - adjustValue) + 'px'
        setIsWidthAdjusted(false)
      }
    }
  }, [])

  const hasVerticalScrollbar = useHasVerticalScrollbar(scrollElement, [isOpen, isSecondaryOpen, isFiltersOpen], adjustWidth)

  return (
    <StyledSearchBar
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
