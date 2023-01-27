import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onChange) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    function calcHasScrollbar () {
      if (!elem) {
        setHasScrollbar(false)
        if (prevHasScrollbar !== false && typeof onChange === 'function') {
          onChange(false)
        }
        return
      }
      const newHasScrollbar = elem.scrollHeight > elem.clientHeight
      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar !== newHasScrollbar && typeof onChange === 'function') {
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
