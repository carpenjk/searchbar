// hooks
import React, { useContext, useEffect, useRef, useState } from 'react'
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

  const { control, searchState } = useContext(SearchBarContext)
  const { open } = control
  const {
    allOpenMode,
    alwaysShowButtons,
    isOpen,
    isHidden,
    isStarted,
    isSecondaryOpen,
    isFiltersOpen,
    setIsFiltersOpen,
    isSearchBarFocused,
    setIsSearchBarFocused,
    setCurrentInputElement,
    isSecondaryWidth,
    hideOnSearch,
    keepButtonsWhenStarted,
    keepOpenOnSearch,
    breakpointToWrap
  } = searchState

  //* Dom References ***********************************************
  const searchBarRef = useRef(null)
  const searchBarBgRef = useRef(null)
  const visibleInputRefs = useRef([])
  const secondaryInputRefs = useRef([])

  //* state ********************************************************
  const [showButtons, setShowButtons] = useState(false)

  //* variables ****************************************************
  const searchBarOffsetTop = offsetTop || DEFAULT_OFFSET_TOP_PX

  useEffect(() => {
    if (allOpenMode) {
      open()
    }
  }, [allOpenMode, open])

  //* event handlers ***********************************************
  const handleFocus = (e) => {
    setIsSearchBarFocused(true)
    setCurrentInputElement(e.target)
    open({ secondary: true })
  }

  const onSearch = () => {
    if (hideOnSearch) {
      control.hide()
    }
    if (!keepOpenOnSearch) {
      control.close()
    }
  }

  const onClickOutsideEffect = () => {
    setIsSearchBarFocused(false)
    if (onExit) {
      onExit()
      return
    }
    control.close()
  }

  function getShowExpandedBackground () {
    if (allOpenMode) {
      return true
    }
    return isSecondaryWidth
      ? isSearchBarFocused || isStarted
      : isSecondaryOpen
  }

  useEffect(() => {
    if (allOpenMode) {
      setShowButtons(true)
      return
    }

    if (isOpen) {
      setShowButtons(true)
      return
    }
    setShowButtons(alwaysShowButtons ||
      isSearchBarFocused ||
      (keepButtonsWhenStarted && isStarted)
    )
  }, [alwaysShowButtons, allOpenMode, isOpen, isSearchBarFocused, isStarted, keepButtonsWhenStarted])

  //* hooks/lifecycle
  useIsoOnClickOutside(searchBarRef, onClickOutsideEffect, [isStarted])
  //* component rendering ********************************************************
  return (
    <>
      {isOpen && !isHidden && <PopupModal isOpen={isOpen} lockScroll />}
      {/* <PopupModal isOpen={isOpen} lockScroll /> */}
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
            isExpanded={getShowExpandedBackground()}
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
            {!allOpenMode && (
              <MoreButton
                text="More Filters"
                onClick={() => setIsFiltersOpen((prev) => !prev)}
                isExpanded={isFiltersOpen}
              />
            )}
            {allOpenMode && <div />}
            <SearchButton tw={{ variant: 'search' }} type="submit" onClick={onSearch} />
          </ButtonContainer>
        </SearchBarContainer>
      </Form>
    </>
  )
}

export default SearchBarMenu
