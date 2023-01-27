import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  let prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    function calcHasScrollbar () {
      console.log('calcHasScrollbar')
      console.log('prevHasScrollbar')
      if (!elem) {
        setHasScrollbar(false)
        if (prevHasScrollbar !== false && typeof onChange === 'function') {
          console.log('onChange:', false)
          onChange(false)
        }
        prevHasScrollbar = false
        return
      }
      const newHasScrollbar = elem.scrollHeight > elem.clientHeight
      console.log('calcHasScrollbar:', newHasScrollbar)
      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar !== newHasScrollbar && typeof onChange === 'function') {
        console.log('onChange:', newHasScrollbar)
        onChange(newHasScrollbar)
      }
    }

    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, onChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
