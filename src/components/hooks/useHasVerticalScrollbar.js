import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []
  const calcHasScrollbar = () => {
    const onChange2 = onChange
    console.log('🚀 ~ file: useHasVerticalScrollbar.js:9 ~ calcHasScrollbar ~ onChange2', onChange2)
    console.log('prevHasScrollbar:', prevHasScrollbar)
    if (!elem) {
      setHasScrollbar(false)
      if (prevHasScrollbar.current !== false && typeof onChange2 === 'function') {
        console.log('onChange:', false)
        onChange2(false)
      }
      prevHasScrollbar.current = false
      return
    }
    const newHasScrollbar = elem.scrollHeight > elem.clientHeight
    console.log('calcHasScrollbar:', newHasScrollbar)
    setHasScrollbar(newHasScrollbar)
    if (prevHasScrollbar.current !== newHasScrollbar && typeof onChange2 === 'function') {
      console.log('onChange:', newHasScrollbar)
      onChange2(newHasScrollbar)
    }
    prevHasScrollbar.current = newHasScrollbar
  }
  useEffect(() => {
    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, onChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
