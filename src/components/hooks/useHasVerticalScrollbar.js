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
          onScrollbarChange(false)
        }
        prevHasScrollbar.current = false
        return
      }
      if (onChange && typeof onChange === 'function') {
        onChange(hasScrollbar)
      }

      // const newHasScrollbar = elem.scrollHeight > elem.clientHeight
      // setHasScrollbar(newHasScrollbar)
      // if (prevHasScrollbar.current !== newHasScrollbar && typeof onScrollbarChange === 'function') {
      //   onScrollbarChange(newHasScrollbar)
      // }
      // prevHasScrollbar.current = newHasScrollbar
    }
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        console.log('🚀 ~ file: useHasVerticalScrollbar.js:23 ~ ro ~ entry', entry)
        const newHasScrollbar = entry.target.scrollHeight > entry.target.clientHeight
        setHasScrollbar(newHasScrollbar)
        if (prevHasScrollbar.current !== newHasScrollbar && typeof onScrollbarChange === 'function') {
          onScrollbarChange(newHasScrollbar)
        }
        prevHasScrollbar.current = newHasScrollbar
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
