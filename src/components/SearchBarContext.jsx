import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { useBreakpoints } from '@carpenjk/prop-x/useBreakpoints'
import { useFormikContext } from 'formik'
import { getIndexedPropValue } from '@carpenjk/prop-x'
import { useHasMounted } from '@carpenjk/hooks'

const SearchBarContext = React.createContext()

const SearchBarInnerProvider = ({
  children,
  onExit,
  search,
  theme,
  options
}) => {
  // options
  const {
    allOpenMode = false,
    alwaysShowButtons = true,
    breakpointToWrap = 1,
    hideOnMount = false,
    hideOnSearch = false,
    keepButtonsWhenStarted = false,
    keepOpenOnSearch = false,
    openOnMount = false,
    secondaryOpenBreakpoint = 1
  } = options || {}

  const hasMounted = useHasMounted()
  const breakpoints = useBreakpoints(theme.breakpoints)
  const isSecondaryWidth = breakpoints.current.width >= breakpoints.br[secondaryOpenBreakpoint]

  const [brAllOpenMode, setBrAllOpenMode] = useState(getIndexedPropValue(allOpenMode, breakpoints.indexOfLower))
  const [brAlwaysShowButtons, setBrAlwaysShowButtons] = useState(getIndexedPropValue(alwaysShowButtons, breakpoints.indexOfLower))
  const [brHideOnMount, setBrHideOnMount] = useState(getIndexedPropValue(hideOnMount, breakpoints.indexOfLower))
  const [brHideOnSearch, setBrHideOnSearch] = useState(getIndexedPropValue(hideOnSearch, breakpoints.indexOfLower))
  const [brKeepButtonsWhenStarted, setBrKeepButtonsWhenStarted] = useState(getIndexedPropValue(keepButtonsWhenStarted, breakpoints.indexOfLower))
  const [brKeepOpenOnSearch, setBrKeepOpenOnSearch] = useState(getIndexedPropValue(keepOpenOnSearch, breakpoints.indexOfLower))
  const [brOpenOnMount, setBrOpenOnMount] = useState(getIndexedPropValue(openOnMount, breakpoints.indexOfLower))

  // state
  const { values } = useFormikContext()
  const [isStarted, setIsStarted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(hideOnMount || false)
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(true)
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(allOpenMode || isSecondaryWidth || false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(allOpenMode || false)
  const [showButtons, setShowButtons] = useState(false)
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false)
  const [currentInputElement, setCurrentInputElement] = useState()

  // prev
  const prevIsOpen = useRef(isOpen)

  // update options
  useEffect(() => {
    setBrAllOpenMode(getIndexedPropValue(allOpenMode, breakpoints.indexOfLower))
    setBrAlwaysShowButtons(getIndexedPropValue(alwaysShowButtons, breakpoints.indexOfLower))
    setBrHideOnMount(getIndexedPropValue(hideOnMount, breakpoints.indexOfLower))
    setBrHideOnSearch(getIndexedPropValue(hideOnSearch, breakpoints.indexOfLower))
    setBrKeepButtonsWhenStarted(getIndexedPropValue(keepButtonsWhenStarted, breakpoints.indexOfLower))
    setBrKeepOpenOnSearch(getIndexedPropValue(keepOpenOnSearch, breakpoints.indexOfLower))
    setBrOpenOnMount(getIndexedPropValue(openOnMount, breakpoints.indexOfLower))
  }, [breakpoints.indexOfLower])

  // mounting effects
  useEffect(() => {
    if (hasMounted) {
      return
    }
    if (brOpenOnMount) {
      setIsOpen(true)
    }
    if (brHideOnMount) {
      setIsHidden(true)
    }
  }, [brOpenOnMount, brHideOnMount, hasMounted])

  // open/close
  useEffect(() => {
    const isOpenChanged = isOpen !== prevIsOpen
    if ((isOpen && isOpenChanged) || brAllOpenMode) {
      setIsPrimaryOpen(true)
      setIsSecondaryOpen(true)
      setIsFiltersOpen(prev => prev || brAllOpenMode)
      setShowButtons(true)
      return
    }
    setIsSecondaryOpen(isOpenChanged ||
      isSecondaryWidth ||
      isSearchBarFocused ||
      (brKeepButtonsWhenStarted && isStarted) ||
      brAlwaysShowButtons
    )
    setShowButtons(isOpenChanged || brAlwaysShowButtons || (brKeepButtonsWhenStarted && isStarted))

    if (!isOpen && prevIsOpen) {
      setIsFiltersOpen(false)
    }
  }, [
    isOpen,
    brAllOpenMode,
    brAlwaysShowButtons,
    brKeepButtonsWhenStarted,
    isSearchBarFocused,
    isStarted,
    isSecondaryWidth
  ])

  function searchHasValues () {
    if (!values) return false
    const aryValues = Object.values(values)
    const valuesNotBlank = aryValues.some((input) => {
      let inpHasValue = false
      if (Array.isArray(input)) {
        inpHasValue = input.length > 0
      } else {
        inpHasValue = input !== ''
      }
      return inpHasValue
    }, false)
    return valuesNotBlank
  }

  function handleExit () {
    if (onExit) {
      onExit()
      return
    }
    close()
  }

  useEffect(() => {
    setIsStarted(searchHasValues())
  }, [values])

  return (
    <SearchBarContext.Provider
      value={{
        options: {
          allOpenMode,
          brAllOpenMode,
          alwaysShowButtons,
          brAlwaysShowButtons,
          openOnMount,
          brOpenOnMount,
          hideOnMount,
          brHideOnMount,
          hideOnSearch,
          brHideOnSearch,
          secondaryOpenBreakpoint,
          keepOpenOnSearch,
          brKeepOpenOnSearch,
          keepButtonsWhenStarted,
          brKeepButtonsWhenStarted,
          breakpointToWrap
        },
        searchState: {
          breakpoints,
          isOpen,
          setIsOpen,
          isHidden,
          setIsHidden,
          isPrimaryOpen,
          setIsPrimaryOpen,
          isSecondaryOpen,
          setIsSecondaryOpen,
          isFiltersOpen,
          setIsFiltersOpen,
          isStarted,
          setIsStarted,
          showButtons,
          setShowButtons,
          isSearchBarFocused,
          setIsSearchBarFocused,
          currentInputElement,
          isSecondaryWidth,
          setCurrentInputElement,
          values,
          isFieldsWrapped: breakpoints.current.width < breakpoints.br[breakpointToWrap],
          onExit: handleExit,
          search
        }
      }}
    >
      {children}
    </SearchBarContext.Provider>
  )
}

export { SearchBarInnerProvider, SearchBarContext }
