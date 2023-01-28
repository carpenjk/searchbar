import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  const onChange2 = onChange
  console.log('🚀 ~ file: useHasVerticalScrollbar.js:5 ~ useHasVerticalScrollbar ~ onChange2', onChange2)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []
  const calcHasScrollbar = (onChange) => {
    const onChange4 = onChange
    console.log('🚀 ~ file: useHasVerticalScrollbar.js:9 ~ calcHasScrollbar ~ onChange4', onChange4)
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
    const onChange3 = onChange2
    const cb = () => calcHasScrollbar(onChange3)
    console.log('🚀 ~ file: useHasVerticalScrollbar.js:33 ~ useEffect ~ onChange3', onChange3)
    window.addEventListener('resize', cb)
    calcHasScrollbar(onChange3)
    return () => window.removeEventListener('resize', cb)
  }, [elem, onChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
