import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react'
import { useBreakpoints } from '@carpenjk/prop-x/useBreakpoints'
import { useFormikContext } from 'formik'
import { useIsoLayoutEffect } from '@carpenjk/hooks'

const SearchBarContext = React.createContext()

const SearchBarInnerProvider = ({
  children,
  openOnMount,
  allOpenMode,
  hideOnOpen,
  onExit,
  search,
  theme,
  options
}) => {
  const { values } = useFormikContext()
  const [isStarted, setIsStarted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(hideOnOpen || false)
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(true)
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(allOpenMode || false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(allOpenMode || false)
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false)
  const [currentInputElement, setCurrentInputElement] = useState()

  console.log('🚀 ~ file: SearchBarContext.jsx ~ line 34 ~ options', options)
  const { secondaryOpenBreakpoint = 1 } = options || {}
  console.log('🚀 ~ file: SearchBarContext.jsx ~ line 34 ~ secondaryOpenBreakpoint', secondaryOpenBreakpoint)

  const breakpoints = useBreakpoints(theme.breakpoints)
  const isSecondaryWidth = breakpoints.current.width >= breakpoints.br[secondaryOpenBreakpoint]

  const openCloseStateSetters = useMemo(
    () => ({
      allOpenMode: {
        primary: setIsPrimaryOpen,
        secondary: setIsSecondaryOpen,
        filters: setIsFiltersOpen
      },
      default:
        !isSecondaryWidth
          ? { secondary: setIsSecondaryOpen, filters: setIsFiltersOpen }
          : { filters: setIsFiltersOpen },
      manual: {
        primary: setIsPrimaryOpen,
        secondary: setIsSecondaryOpen,
        filters: setIsFiltersOpen
      }
    }),
    [breakpoints, setIsFiltersOpen, setIsSecondaryOpen, setIsPrimaryOpen]
  )

  const setFromObj = useCallback(
    (obj, bln) => {
      Object.keys(obj).forEach((key) => {
        openCloseStateSetters.manual[key](bln)
      })
    },
    [openCloseStateSetters]
  )

  const setFromMode = useCallback(
    (mode, bln) => {
      setFromObj(openCloseStateSetters[mode], bln)
    },
    [setFromObj, openCloseStateSetters]
  )

  const open = useCallback(
    (props) => {
      const { primary, secondary, filters } = props || {}
      if (!primary && !secondary && !filters) {
        const mode = allOpenMode ? 'allOpenMode' : 'default'
        // openCloseFns[mode].forEach((fn) => {
        //   fn(true);
        // });
        setFromMode(mode, true)
        setIsOpen(true)
        return
      }
      setFromObj(props, true)
      setIsOpen(true)
    },
    [allOpenMode, setFromObj, setFromMode]
  )

  const close = useCallback(
    (props) => {
      const { primary, secondary, filters } = props || {}
      if (!primary && !secondary && !filters) {
        const mode = allOpenMode ? 'allOpenMode' : 'default'
        // openCloseFns[mode].forEach((fn) => fn(false));
        setFromMode(mode, false)
        setIsOpen(false)
        return
      }
      setFromObj(props, false)
      setIsOpen(false)
    },
    [allOpenMode, setFromObj, setFromMode]
  )

  function hide () {
    setIsHidden(true)
  }
  function unHide () {
    setIsHidden(false)
  }

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

  useIsoLayoutEffect(() => {
    setIsStarted(searchHasValues())
  }, [values])

  useEffect(() => {
    if (openOnMount) {
      open()
    }
  }, [openOnMount, open])

  return (
    <SearchBarContext.Provider
      value={{
        control: {
          open,
          close,
          hide,
          unHide,
          search
        },
        searchState: {
          allOpenMode,
          breakpoints,
          isOpen,
          isHidden,
          isPrimaryOpen,
          setIsPrimaryOpen,
          isSecondaryOpen,
          setIsSecondaryOpen,
          isFiltersOpen,
          setIsFiltersOpen,
          isStarted,
          isSearchBarFocused,
          setIsSearchBarFocused,
          currentInputElement,
          isSecondaryWidth,
          options,
          setCurrentInputElement,
          values,
          onExit: handleExit
        }
      }}
    >
      {children}
    </SearchBarContext.Provider>
  )
}

export { SearchBarInnerProvider, SearchBarContext }
