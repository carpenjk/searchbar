import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []
  const calcHasScrollbar = (onChange) => {
    const onChange3 = onChange
    console.log('🚀 ~ file: useHasVerticalScrollbar.js:9 ~ calcHasScrollbar ~ onChange3', onChange3)
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
  useEffect(() => {
    const onChange2 = onChange
    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar(onChange2)
    return () => window.removeEventListener('resize', () => calcHasScrollbar(onChange2))
  }, [elem, onChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
