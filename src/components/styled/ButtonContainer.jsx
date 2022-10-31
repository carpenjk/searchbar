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
  padding-top: ${getPaddingTop({}, '0')};
  padding-right: ${getPaddingRight({}, '0')};
  padding-bottom: ${getPaddingBottom({}, '0')};
  padding-left: ${getPaddingLeft({}, '0')};
  border-top: none;

  ${condition('isSearchFiltersOpen')`
    border-top: 1px solid rgba(151, 151, 151, 0.35);
  `}

  ${breakpoint(1)`
    display: none;
    background-color: ${getBackgroundColor({}, 'initial')};
    padding-top: ${getPaddingTop({}, '0')};
    padding-right: ${getPaddingRight({}, '0')};
    padding-bottom: ${getPaddingBottom({}, '0')};
    padding-left: ${getPaddingLeft({}, '0')};
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
