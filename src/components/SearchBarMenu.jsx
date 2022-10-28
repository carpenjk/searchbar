// hooks
import React, { useContext, useRef } from 'react'
import { Form } from 'formik'
import { useIsoOnClickOutside } from '@carpenjk/hooks'
import { SearchBarContext } from './SearchBarContext'

// components
import SearchBarContainer from './SearchBarContainer'
import ExpandedBackground from './ExpandBackground'
import SearchButton from './SearchButton'
import MoreButton from './MoreButton'
import SearchFilters from './SearchFilters'
import PopupModal from '@carpenjk/popup-modal'
import InputGroup from './InputGroup'
import MenuContainer from './MenuContainer'
import SearchFieldsContainer from './SearchFieldsContainer'
import ButtonContainer from './ButtonContainer'

// global var
const DEFAULT_OFFSET_TOP_PX = 20

//* *****************************************************************
//* Beginning of Functional Component ******************************
const SearchBarMenu = (props) => {
  const {
    offsetTop,
    openMaxWidth,
    checkFilters,
    FilterFields,
    PrimarySearchFields,
    SecondarySearchFields,
    onExit
  } = props
  //* context *********************************************************

  const { searchState, options } = useContext(SearchBarContext)
  const {
    brAllOpenMode,
    brHideOnSearch,
    brKeepOpenOnSearch,
    breakpointToWrap
  } = options
  const {
    isOpen,
    setIsOpen,
    isHidden,
    setIsHidden,
    isStarted,
    isSecondaryOpen,
    isFiltersOpen,
    setIsFiltersOpen,
    showButtons,
    isSearchBarFocused,
    setIsSearchBarFocused,
    setCurrentInputElement
  } = searchState

  //* Dom References ***********************************************
  const searchBarRef = useRef(null)
  const searchBarBgRef = useRef(null)
  const visibleInputRefs = useRef([])
  const secondaryInputRefs = useRef([])

  //* variables ****************************************************
  const searchBarOffsetTop = offsetTop || DEFAULT_OFFSET_TOP_PX

  //* event handlers ***********************************************
  const handleFocus = (e) => {
    setIsSearchBarFocused(true)
    setIsOpen(true)
    setCurrentInputElement(e.target)
  }

  const onSearch = () => {
    if (brHideOnSearch) {
      setIsHidden(false)
    }
    if (!brKeepOpenOnSearch) {
      setIsOpen(false)
    }
  }

  const onClickOutsideEffect = () => {
    setIsSearchBarFocused(false)
    if (onExit) {
      onExit()
      return
    }
    setIsOpen(false)
  }
  //* hooks/lifecycle
  useIsoOnClickOutside(searchBarRef, onClickOutsideEffect, [isStarted])
  //* component rendering ********************************************************
  return (
    <>
      {isOpen && !isHidden && <PopupModal isOpen={isOpen} lockScroll />}
      <Form autoComplete="off">
        <SearchBarContainer
          isHidden={isHidden}
          isFiltersOpen={isFiltersOpen}
          isSearchBarFocused={isSearchBarFocused}
          isSecondaryOpen={isSecondaryOpen}
          offsetTop={searchBarOffsetTop}
          openMaxWidth={openMaxWidth}
          searchBarRef={searchBarRef}
        >
          <ExpandedBackground
            isExpanded={showButtons}
            hideRight={[false, isFiltersOpen]}
            innerRef={searchBarBgRef}
          />
          <MenuContainer
            isFiltersOpen={isFiltersOpen}
            isSearchBarFocused={isSearchBarFocused}
          >
            <SearchFieldsContainer breakpointToWrap={breakpointToWrap} isFiltersOpen={isFiltersOpen}>
              <InputGroup hide={false}>
                <PrimarySearchFields
                  inputRefs={visibleInputRefs}
                  onInputFocus={handleFocus}
                  searchBarRef={searchBarRef}
                  {...searchState}
                />
              </InputGroup>
              <InputGroup hide={[!isSecondaryOpen, false]}>
                <SecondarySearchFields
                  inputRefs={secondaryInputRefs}
                  onInputFocus={handleFocus}
                  searchBarRef={searchBarRef}
                  {...searchState}
                />
              </InputGroup>
            </SearchFieldsContainer>
            <SearchFilters
              FilterFields={FilterFields}
              checkFilters={checkFilters}
              isScrollable={[false, true]}
              {...searchState}
            />
          </MenuContainer>
          <ButtonContainer
            isDisplayed={showButtons}
            isFiltersOpen={isFiltersOpen}
          >
            {!brAllOpenMode && (
              <MoreButton
                text="More Filters"
                onClick={() => setIsFiltersOpen((prev) => !prev)}
                isExpanded={isFiltersOpen}
              />
            )}
            {brAllOpenMode && <div />}
            <SearchButton tw={{ variant: 'search' }} type="submit" onClick={onSearch} />
          </ButtonContainer>
        </SearchBarContainer>
      </Form>
    </>
  )
}

export default SearchBarMenu
