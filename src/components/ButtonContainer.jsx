import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'
import {
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft
} from '@carpenjk/themeweaver'

const StyledButtonContainer = styled.div`
  display: none;
  ${condition('isDisplayed')`
    display: flex;
  `}
  justify-content: space-between;
  padding-top: ${getPaddingTop('searchBar_container.buttons', '0')};
  padding-right: ${getPaddingRight('searchBar_container.buttons', '0')};
  padding-bottom: ${getPaddingBottom('searchBar_container.buttons', '0')};
  padding-left: ${getPaddingLeft('searchBar_container.buttons', '0')};
  border-top: none;

  ${condition('isSearchFiltersOpen')`
    border-top: 1px solid rgba(151, 151, 151, 0.35);
  `}

  ${breakpoint(1)`
    display: none;
    ${condition('isDisplayed')`
      display: flex;
    `}
  `}
`

const ButtonContainer = ({ children, isDisplayed, isFiltersOpen }) => (
  <StyledButtonContainer
    isSearchFiltersOpen={isFiltersOpen}
    isDisplayed={isDisplayed}
  >
    {children}
  </StyledButtonContainer>
)

export default ButtonContainer
