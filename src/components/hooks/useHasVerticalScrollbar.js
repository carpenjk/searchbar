import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onScrollbarChange, onChange) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    const calcHasScrollbar = () => {
      if (!elem) {
        setHasScrollbar(false)
        if (prevHasScrollbar.current !== false && typeof onScrollbarChange === 'function') {
          console.log('onChange:', false)
          onScrollbarChange(false)
        }
        prevHasScrollbar.current = false
        return
      }
      if (onChange && typeof onChange === 'function') {
        onChange(hasScrollbar)
      }
      const newHasScrollbar = elem.scrollHeight > elem.clientHeight
      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar.current !== newHasScrollbar && typeof onScrollbarChange === 'function') {
        onScrollbarChange(newHasScrollbar)
      }
      prevHasScrollbar.current = newHasScrollbar
    }
    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, onScrollbarChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
