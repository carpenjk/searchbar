import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import {
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  getBackgroundColor
} from '@carpenjk/themeweaver'

const StyledButtonContainer = styled.div`
  display: none;
  ${condition('isDisplayed')`
    display: flex;
  `}
  justify-content: space-between;
  background-color: ${getBackgroundColor({}, 'initial')};
  padding-top: ${getPaddingTop({}, '16px')};
  padding-right: ${getPaddingRight({}, '16px')};
  padding-bottom: ${getPaddingBottom({}, '16px')};
  padding-left: ${getPaddingLeft({}, '16px')};
  border-top: none;

  ${condition('isSearchFiltersOpen')`
    border-top: 1px solid rgba(151, 151, 151, 0.35);
  `}

  ${breakpoint(1)`
    display: none;
    background-color: ${getBackgroundColor({}, 'initial')};
    padding-top: ${getPaddingTop({}, '16px')};
    padding-right: ${getPaddingRight({}, '16px')};
    padding-bottom: ${getPaddingBottom({}, '16px')};
    padding-left: ${getPaddingLeft({}, '16px')};
    ${condition('isDisplayed')`
      display: flex;
    `}
  `}
`
StyledButtonContainer.defaultProps = {
  tw: { semKey: 'searchBar__buttonContainer' }
}

const ButtonContainer = ({ children, isDisplayed, isFiltersOpen }) => (
  <StyledButtonContainer
    isSearchFiltersOpen={isFiltersOpen}
    isDisplayed={isDisplayed}
  >
    {children}
  </StyledButtonContainer>
)

export default ButtonContainer
