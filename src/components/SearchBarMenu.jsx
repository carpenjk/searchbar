// hooks
import React, { useRef } from 'react'
import { Form } from 'formik'
import useIsoOnClickOutside from './hooks/useIsoOnClickOutside'

// components
import SearchBarContainer from './styled/SearchBarContainer'
import ExpandedBackground from './styled/ExpandBackground'
import SearchButton from './styled/SearchButton'
import MoreButton from './styled/MoreButton'
import SearchFilters from './SearchFilters'
import PopupModal from './other/PopupModal'
import InputGroup from './styled/InputGroup'
import MenuContainer from './styled/MenuContainer'
import SearchFieldsContainer from './styled/SearchFieldsContainer'
import ButtonContainer from './styled/ButtonContainer'
import useSearchBar from './context/useSeachBar'

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

  const { searchState, options } = useSearchBar()
  const {
    brAllOpenMode,
    brHideOnSearch,
    brKeepOpenOnSearch,
    breakpointToWrap,
    brSearchOnExit
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
    setCurrentInputElement,
    search,
    values,
    isValuesChanged,
    setIsValuesChanged
  } = searchState

  //* Dom References ***********************************************
  const searchBarRef = useRef(null)
  const menuContainerRef = useRef(null)
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
  const handleFilterClick = () => {
    setIsOpen(true)
    setIsFiltersOpen((prev) => !prev)
  }

  const onSearch = () => {
    if (brHideOnSearch) {
      setIsHidden(false)
    }
    if (!brKeepOpenOnSearch) {
      setIsOpen(false)
    }
    setIsValuesChanged(false)
  }

  const onClickOutsideEffect = () => {
    setIsSearchBarFocused(false)
    if (onExit) {
      onExit()
      return
    }
    setIsOpen(false)
    if (brSearchOnExit && isValuesChanged) {
      search(values)
      onSearch()
    }
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
            searchBarRef={searchBarRef}
            menuContainerRef={menuContainerRef}
            isExpanded={showButtons}
            hideRight={[false, isFiltersOpen]}
            innerRef={searchBarBgRef}
            isFiltersOpen={isFiltersOpen}
          />
          <MenuContainer
            menuContainerRef={menuContainerRef}
            isFiltersOpen={isFiltersOpen}
            isSearchBarFocused={isSearchBarFocused}
          >
            <SearchFieldsContainer breakpointToWrap={breakpointToWrap} isFiltersOpen={isFiltersOpen}>
              <InputGroup hide={false}>
                <PrimarySearchFields
                  inputRefs={visibleInputRefs}
                  onInputFocus={handleFocus}
                  searchBarRef={searchBarRef}
                  searchState={searchState}
                  options={options}
                />
              </InputGroup>
              <InputGroup hide={[!isSecondaryOpen, false]}>
                <SecondarySearchFields
                  inputRefs={secondaryInputRefs}
                  onInputFocus={handleFocus}
                  searchBarRef={searchBarRef}
                  searchState={searchState}
                  options={options}
                />
              </InputGroup>
            </SearchFieldsContainer>
            <SearchFilters
              FilterFields={FilterFields}
              checkFilters={checkFilters}
              isScrollable={[false, true]}
              searchState={searchState}
              options={options}
            />
          </MenuContainer>
          <ButtonContainer
            isDisplayed={showButtons}
            isFiltersOpen={isFiltersOpen}
          >
            {!brAllOpenMode && (
              <MoreButton
                text="More Filters"
                onClick={handleFilterClick}
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
