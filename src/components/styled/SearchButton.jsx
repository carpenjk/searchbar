import React from 'react'
import styled from 'styled-components'
import {
  getBackgroundColor,
  getColor,
  getWidth,
  getHeight,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  getBorder,
  getBorderColor,
  getBorderRadius,
  getFontFamily,
  getFontWeight,
  getFontSize,
  getLineHeight,
  getTransform
} from '@carpenjk/themeweaver'

import { breakpoint } from '@carpenjk/prop-x/css'

const StyledButton = styled.button`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: ${getWidth({}, 'auto')};
  height: ${getHeight({}, 'auto')};
  color: ${getColor({}, '#F6FEFF')};
  background-color: ${getBackgroundColor({}, '#B64D57')};
  padding-top: ${getPaddingTop({}, '1em')};
  padding-right: ${getPaddingRight({}, '2em')};
  padding-bottom: ${getPaddingBottom({}, '1em')};
  padding-left: ${getPaddingLeft({}, '2em')};
  border: ${getBorder({}, '2px solid #cdf7f6')};
  border-color: ${getBorderColor({})};
  border-radius: ${getBorderRadius({}, '10px')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'bold')};
  font-size: ${getFontSize({}, '18px')};
  line-height: ${getLineHeight({}, '21px')};
  transition: all 0.35s linear;
  &:active {
    color: ${getColor({ suffix: '-active' }, '#F6FEFF')};
    background-color: ${getBackgroundColor({ suffix: '-active' }, '#B64D57')};
    border: ${getBorder({ suffix: '-active' }, '2px solid #cdf7f6')};
    border-color: ${getBorderColor({ suffix: '-active' })};
    transform: ${getTransform({ suffix: '-active' }, 'none')};
    text-decoration: underline;
    
  }

  &:hover {
    color: ${getColor({ suffix: '-hover' }, '#F6FEFF')};
    background-color: ${getBackgroundColor({ suffix: '-hover' }, '#B64D57')};
    border: ${getBorder({ suffix: '-hover' }, '2px solid #cdf7f6')};
    transform: ${getTransform({ suffix: '-hover' }, 'none')};
  }

  :disabled {
    opacity: 50%;
    color: ${getColor({ suffix: '-disabled' }, '#F6FEFF')};
    background-color: ${getBackgroundColor(
      { suffix: '-disabled' },
      '#B64D57'
    )};
    border: ${getBorder({ suffix: '-disabled' }, '2px solid #cdf7f6')};
    transform: ${getTransform({ suffix: '-disabled' }, 'none')};
  }

  ${breakpoint(1)`
    width: ${getWidth({}, 'auto')};
    height: ${getHeight({}, 'auto')};
    color: ${getColor({}, '#F6FEFF')};
    background-color: ${getBackgroundColor({}, '#B64D57')};
    padding-top: ${getPaddingTop({}, '1em')};
    padding-right: ${getPaddingRight({}, '2em')};
    padding-bottom: ${getPaddingBottom({}, '1em')};
    padding-left: ${getPaddingLeft({}, '2em')};
    border: ${getBorder({}, '2px solid #cdf7f6')};
    border-radius: ${getBorderRadius({}, '10px')};
    font-family: ${getFontFamily({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'bold')};
    font-size: ${getFontSize({}, '18px')};
    line-height: ${getLineHeight({}, '21px')};

    &:active {
      color: ${getColor({ suffix: '-active' }, '#F6FEFF')};
      background-color: ${getBackgroundColor({ suffix: '-active' }, '#B64D57')};
      border: ${getBorder({ suffix: '-active' }, '2px solid #cdf7f6')};
      transform: ${getTransform({ suffix: '-active' }, 'none')};
      text-decoration: underline;
    }

    &:hover {
      color: ${getColor({ suffix: '-hover' }, '#F6FEFF')};
      background-color: ${getBackgroundColor({ suffix: '-hover' }, '#B64D57')};
      border: ${getBorder({ suffix: '-hover' }, '2px solid #cdf7f6')};
      transform: ${getTransform({ suffix: '-hover' }, 'none')};
    }
    
    &:disabled {
      opacity: 50%;
      color: ${getColor({ suffix: '-disabled' }, '#F6FEFF')};
      background-color: ${getBackgroundColor(
        { suffix: '-disabled' },
        '#B64D57'
      )};
      border: ${getBorder({ suffix: '-disabled' }, '2px solid #cdf7f6')};
      transform: ${getTransform({ suffix: '-disabled' }, 'none')};
    }
  `}
`

const DEFAULT_TW = {
  semKey: 'button'
}

const SearchButton = ({ tw, ...rest }) => (
  <StyledButton
    tw={{ ...DEFAULT_TW, ...tw }}
    {...rest}
  >
    Search
  </StyledButton>
)

export default SearchButton
