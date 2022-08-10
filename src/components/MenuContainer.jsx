import React from 'react'
import styled from 'styled-components'
import { breakpoint, condition } from '@carpenjk/prop-x/css'

const StyledMenuContainer = styled.div`
  overflow-y: visible;

  ${condition('isFiltersOpen')`
    overflow-y: auto;
    padding: 4px;
  `}

  ${breakpoint(1)`
    display: flex;
    flex-direction: column;
    ${condition('isFiltersOpen')`
      padding: 8px;
    `}
  `}
`

const MenuContainer = ({ children, isFiltersOpen, isSearchBarFocused }) => (
  <StyledMenuContainer
    isFiltersOpen={isFiltersOpen}
    isSearchBarFocused={isSearchBarFocused}
  >
    {children}
  </StyledMenuContainer>
)

export default MenuContainer
