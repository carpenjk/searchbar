import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  console.log('useHasVerticalScrollbar onChange', onChange)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    console.log('useEffect on change', onChange)
    const calcHasScrollbar = () => {
      console.log('onChange', onChange)
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
      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar.current !== newHasScrollbar && typeof onChange === 'function') {
        console.log('onChange:', newHasScrollbar)
        onChange(newHasScrollbar)
      }
      prevHasScrollbar.current = newHasScrollbar
    }
    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar(onChange)
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, onChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
