import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  console.log('useHasVerticalScrollbar onChange', onChange)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    console.log('useEffect on change', onChange)
    const calcHasScrollbar = () => {
      console.log('calcHasScrollbar onChange', onChange)
      console.log('typeof onChange', typeof onChange)
      console.log('prevHasScrollbar:', prevHasScrollbar)
      if (!elem) {
        setHasScrollbar(false)
        if (prevHasScrollbar.current !== false && typeof onChange === 'function') {
          console.log('onChange:', false)
          onChange(false)
        }
        prevHasScrollbar.current = false
        return
      }
      const newHasScrollbar = elem.scrollHeight > elem.clientHeight
      console.log('calcHasScrollbar:', newHasScrollbar)
      console.log("prevHasScrollbar.current !== newHasScrollbar && typeof onChange === 'function'", prevHasScrollbar.current !== newHasScrollbar && typeof onChange === 'function')
      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar.current !== newHasScrollbar && typeof onChange === 'function') {
        console.log('onChange:', newHasScrollbar)
        onChange(newHasScrollbar)
      }
      prevHasScrollbar.current = newHasScrollbar
    }
    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, onChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
