import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps, onScrollbarChange, onChange) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    const calcHasScrollbar = (el) => {
      const newHasScrollbar = el.target.scrollHeight > el.target.clientHeight
      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar.current !== newHasScrollbar && typeof onScrollbarChange === 'function') {
        onScrollbarChange(newHasScrollbar)
      }
      prevHasScrollbar.current = newHasScrollbar
    }

    // no observer needed until elem exists
    if (!elem) {
      setHasScrollbar(false)
      if (prevHasScrollbar.current !== false && typeof onScrollbarChange === 'function') {
        onScrollbarChange(false)
      }
      prevHasScrollbar.current = false
      return
    }
    if (onChange && typeof onChange === 'function') {
      onChange(hasScrollbar)
    }

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        console.log('🚀 ~ file: useHasVerticalScrollbar.js:23 ~ ro ~ entry', entry)
        calcHasScrollbar(entry.target)
      }
    })

    // Observe one or multiple elements
    ro.observe(elem)
    calcHasScrollbar()
    return () => {
      if (elem) {
        ro.unobserve(elem)
      } else {
        ro.disconnect()
      }
    }
  }, [elem, onScrollbarChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
