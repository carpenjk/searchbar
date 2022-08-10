import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import {
  getBackgroundColor,
  getBorderRadius,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft
} from '@carpenjk/themeweaver'

const StyledBackground = styled.div`
  background-color: transparent;
  ${condition('isExpanded')`
    background-color: ${getBackgroundColor('searchBar', 'none')};
    border: 1px solid #e1e1e1;
  `}
  border-radius: ${getBorderRadius('searchBar', '8px')};
  position: absolute;
  top: -${getPaddingTop('searchBar', '1rem')};
  right: -${getPaddingRight('searchBar', '1rem')};
  bottom: -${getPaddingBottom('searchBar', '1rem')};
  left: -${getPaddingLeft('searchBar', '1rem')};

  ${condition('hideRight')`
    right: 0;
  `}
  z-index: -999999;

  ${breakpoint(1)`
    background-color: transparent;
    ${condition('isExpanded')`
      background-color: ${getBackgroundColor('searchBar', 'none')};
    `}
    
    border-radius: ${getBorderRadius('searchBar', '8px')};
    top: -${getPaddingTop('searchBar', '1rem')};
    right: -${getPaddingRight('searchBar', '1rem')};
    bottom: -${getPaddingBottom('searchBar', '1rem')};
    left: -${getPaddingLeft('searchBar', '1rem')};
    right: -${getPaddingRight('searchBar', '1rem')};
    ${condition('hideRight')`
      right: 0;
    `}
  `}
`

StyledBackground.defaultProps = {
  isExpanded: false,
  hideRight: false
}

const ExpandBackground = (props) => {
  const { isExpanded, hideRight, innerRef } = props

  return (
    <StyledBackground
      isExpanded={isExpanded}
      hideRight={hideRight}
      ref={innerRef}
    />
  )
}

export default ExpandBackground
