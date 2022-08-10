import React from 'react'
import styled from 'styled-components'
import {
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
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

const StyledFilterHeader = styled.h1`
  display: block;
  font-family: ${getFontFamily('h1.searchBar', 'inherit')};
  font-weight: ${getFontWeight('h1.searchBar', 'bold')};
  font-size: ${getFontSize('h1.searchBar', '1.8rem')};
  line-height: ${getLineHeight('h1.searchBar', '150%')};
  letter-spacing: ${getLetterSpacing('h1.searchBar', '0.025em')};
  color: ${getColor('h1.searchBar', 'inherit')};

  margin-top: ${getMarginTop('h1.searchBar', '0')};
  margin-right: ${getMarginRight('h1.searchBar', '0')};
  margin-bottom: ${getMarginBottom('h1.searchBar', '1rem')};
  margin-left: ${getMarginLeft('h1.searchBar', '0')};
  padding-top: ${getPaddingTop('h1.searchBar', '0')};
  padding-right: ${getPaddingRight('h1.searchBar', '0')};
  padding-bottom: ${getPaddingBottom('h1.searchBar', '0')};
  padding-left: ${getPaddingLeft('h1.searchBar', '0')};
`

const FilterHeader = (props) => (
  <StyledFilterHeader>{props.headerText}</StyledFilterHeader>
)

export default FilterHeader
