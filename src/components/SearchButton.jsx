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

import { condition, breakpoint } from '@carpenjk/prop-x/css'

const StyledButton = styled.button`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: ${getWidth({}, 'auto')};
  height: ${getHeight({}, 'auto')};
  color: ${getColor({}, 'white')};
  background-color: ${getBackgroundColor({}, '#E5707A')};
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

  &.isActive {
    color: ${getColor({ suffix: '_isActive' }, '#E5707A')};
    background-color: ${getBackgroundColor({ suffix: '_isActive' }, 'white')};
    border: ${getBorder({ suffix: '_isActive' }, '2px solid #cdf7f6')};
    border-color: ${getBorderColor({ suffix: '_isActive' })};
    transform: ${getTransform({ suffix: '_isActive' }, 'none')};
    text-decoration: underline;
    transition: all 0.35s linear;
  }

  &:hover {
    ${condition('hover')`
    color: ${getColor({ suffix: '_hover' }, '#E5707A')};
    background-color: ${getBackgroundColor({ suffix: '_hover' }, 'white')};
    border: ${getBorder({ suffix: '_hover' }, '2px solid #cdf7f6')};
    border-color: ${getBorderColor({ suffix: '_hover' })};
    transform: ${getTransform({ suffix: '_hover' }, 'none')};
    transition: all 0.35s linear;
    `}
  }

  ${condition('disabled')`
      opacity: 50%;
      color: ${getColor({ suffix: '_isDisabled' }, '#E5707A')};
      background-color: ${getBackgroundColor(
        { suffix: '_isDisabled' },
        'white'
      )};
      border: ${getBorder({ suffix: '_isDisabled' }, '2px solid #cdf7f6')};
      border-color: ${getBorderColor({ suffix: '_isDisabled' })};
      transform: ${getTransform({ suffix: '_isDisabled' }, 'none')};
  `}

  ${breakpoint(1)`
    width: ${getWidth({}, 'auto')};
    height: ${getHeight({}, 'auto')};
    color: ${getColor({}, 'white')};
    background-color: ${getBackgroundColor({}, '#E5707A')};
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

    &.isActive {
      color: ${getColor({ suffix: '_isActive' }, '#E5707A')};
      background-color: ${getBackgroundColor({ suffix: '_isActive' }, 'white')};
      border: ${getBorder({ suffix: '_isActive' }, '2px solid #cdf7f6')};
      border-color: ${getBorderColor({ suffix: '_isActive' })};
      transform: ${getTransform({ suffix: '_isActive' }, 'none')};
      text-decoration: underline;
      transition: all 0.35s linear;
    }

    &:hover {
      ${condition('hover')`
      color: ${getColor({ suffix: '_hover' }, '#E5707A')};
      background-color: ${getBackgroundColor({ suffix: '_hover' }, 'white')};
      border: ${getBorder({ suffix: '_hover' }, '2px solid #cdf7f6')};
      border-color: ${getBorderColor({ suffix: '_hover' })};
      transform: ${getTransform({ suffix: '_hover' }, 'none')};
      transition: all 0.35s linear;
      `}
      
    }
    
    ${condition('disabled')`
        opacity: 50%;
        color: ${getColor({ suffix: '_isDisabled' }, '#E5707A')};
        background-color: ${getBackgroundColor(
          { suffix: '_isDisabled' },
          'white'
        )};
        border: ${getBorder({ suffix: '_isDisabled' }, '2px solid #cdf7f6')};
        border-color: ${getBorderColor({ suffix: '_isDisabled' })};
        transform: ${getTransform({ suffix: '_isDisabled' }, 'none')};
    `}
  
  `}
`

const DEFAULT_TW = {
  semKey: 'button'
}

const ActionButton = ({ tw, variant, children, isActive, ...rest }) => {
  const mergedTw = { ...DEFAULT_TW, ...tw }
  return (
    <StyledButton
      className={isActive ? 'isActive' : ''}
      tw={mergedTw}
      hover={!isActive}
      {...rest}
      semKey={`button.${variant}`}
    >
      {children}
    </StyledButton>
  )
}

export default ActionButton
