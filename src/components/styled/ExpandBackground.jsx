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
    background-color: ${getBackgroundColor('searchBar', 'initial')};
    border: 1px solid #e1e1e1;
  `}
  border-radius: ${getBorderRadius('searchBar', '8px')};
  position: absolute;
  top: -${getPaddingTop('searchBar', '8px')};
  right: -${getPaddingRight('searchBar', '8px')};
  bottom: -${getPaddingBottom('searchBar', '8px')};
  left: -${getPaddingLeft('searchBar', '8px')};

  ${condition('hideRight')`
    right: 0;
  `}
  z-index: -999999;

  ${breakpoint(1)`
    background-color: transparent;
    ${condition('isExpanded')`
      background-color: ${getBackgroundColor('searchBar', 'initial')};
    `}
    border-radius: ${getBorderRadius('searchBar', '8px')};
    top: -${getPaddingTop('searchBar', '8px')};
    right: -${getPaddingRight('searchBar', '8px')};
    bottom: -${getPaddingBottom('searchBar', '8px')};
    left: -${getPaddingLeft('searchBar', '8px')};
    right: -${getPaddingRight('searchBar', '8px')};
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
