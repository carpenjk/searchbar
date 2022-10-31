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
import { condition } from '@carpenjk/prop-x/css'

const StyledButton = styled.button`
  flex: none;
  padding-top: ${getPaddingTop('button.expander', '0')};
  padding-right: ${getPaddingRight('button.expander', '0')};
  padding-bottom: ${getPaddingBottom('button.expander', '0')};
  padding-left: ${getPaddingLeft('button.expander', '0')};
  margin-top: ${getMarginTop('button.expander', '0')};
  margin-right: ${getMarginRight('button.expander', '0')};
  margin-bottom: ${getMarginBottom('button.expander', '0')};
  margin-left: ${getMarginLeft('button.expander', '0')};
  background-color: ${getBackgroundColor('button.expander', 'initial')};
  color: ${getColor('button.expander', 'inherit')};
  font-family: ${getFontFamily('button.expander', 'inherit')};
  font-weight: ${getFontWeight('button.expander', 'normal')};
  font-size: ${getFontSize('button.expander', '1.6rem')};
  letter-spacing: ${getLetterSpacing('button.expander', '0.025em')};

  background: none;
  border: none;
  cursor: pointer;

  ${condition(({ tw }) => tw && tw.state === 'strong')`
    font-weight: ${getFontWeight('button.expander_strong', 'bold')};
  `}
`
const MoreButton = (props) => {
  const { innerRef, isExpanded, text, ...remProps } = props
  return (
    <StyledButton {...remProps} ref={innerRef} type="button" tabIndex="0">
      {isExpanded ? `- ${text}` : `+ ${text}`}
    </StyledButton>
  )
}

export default MoreButton
