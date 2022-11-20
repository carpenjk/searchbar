import React from 'react'
import styled from 'styled-components'
import {
  getBackgroundColor,
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft
} from '@carpenjk/themeweaver'
import { breakpoint, condition } from '@carpenjk/prop-x/css'

const StyledButton = styled.button`
  flex: none;
  padding-top: ${getPaddingTop({}, '0')};
  padding-right: ${getPaddingRight({}, '0')};
  padding-bottom: ${getPaddingBottom({}, '0')};
  padding-left: ${getPaddingLeft({}, '0')};
  margin-top: ${getMarginTop({}, '0')};
  margin-right: ${getMarginRight({}, '0')};
  margin-bottom: ${getMarginBottom({}, '0')};
  margin-left: ${getMarginLeft({}, '0')};
  background-color: ${getBackgroundColor({}, 'initial')};
  color: ${getColor({}, 'inherit')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'normal')};
  font-size: ${getFontSize({}, '1.6rem')};
  letter-spacing: ${getLetterSpacing({}, '0.025em')};
  background: none;
  border: none;
  cursor: pointer;

  ${condition('isExpanded')`
    background-color: ${getBackgroundColor({ suffix: '-expanded' }, '')};
    color: ${getColor({ suffix: '-expanded' }, '')};
    font-weight: ${getFontWeight({ suffix: '-expanded' }, '')};
  `}

  ${breakpoint(1)`
    padding-top: ${getPaddingTop({}, '0')};
    padding-right: ${getPaddingRight({}, '0')};
    padding-bottom: ${getPaddingBottom({}, '0')};
    padding-left: ${getPaddingLeft({}, '0')};
    margin-top: ${getMarginTop({}, '0')};
    margin-right: ${getMarginRight({}, '0')};
    margin-bottom: ${getMarginBottom({}, '0')};
    margin-left: ${getMarginLeft({}, '0')};
    background-color: ${getBackgroundColor({}, 'initial')};
    color: ${getColor({}, 'inherit')};
    font-family: ${getFontFamily({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'normal')};
    font-size: ${getFontSize({}, '1.6rem')};
    letter-spacing: ${getLetterSpacing({}, '0.025em')};
    ${condition('isExpanded')`
      background-color: ${getBackgroundColor({ suffix: '-expanded' }, '')};
      color: ${getColor({ suffix: '-expanded' }, '')};
      font-weight: ${getFontWeight({ suffix: '-expanded' }, '')};
  `}
  `}
`

StyledButton.defaultProps = {
  tw: { semKey: 'button', variant: 'expander' }
}
const MoreButton = (props) => {
  const { innerRef, isExpanded, text, ...remProps } = props
  return (
    <StyledButton {...remProps}
      isExpanded={isExpanded}
      ref={innerRef}
      type="button"
      tabIndex="0"
    >
      {isExpanded ? `- ${text}` : `+ ${text}`}
    </StyledButton>
  )
}

export default MoreButton
