import { useEffect, useRef, useState } from 'react'

const useHasVerticalScrollbar = ({ scrollElement, containerElement, deps, onScrollbarChange, onChange }) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const prevHasScrollbar = useRef(hasScrollbar)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    const calcHasScrollbar = (el) => {
      const containerMaxHeight = parseFloat(window?.getComputedStyle(containerElement).getPropertyValue('max-height'))
      const isBiggerThanContainer = el.scrollHeight > el.clientHeight
      const newHasScrollbar = containerMaxHeight
        ? isBiggerThanContainer && parseFloat(el.scrollHeight) > containerMaxHeight
        : isBiggerThanContainer

      setHasScrollbar(newHasScrollbar)
      if (prevHasScrollbar.current !== newHasScrollbar && typeof onScrollbarChange === 'function') {
        onScrollbarChange(newHasScrollbar)
      }
      prevHasScrollbar.current = newHasScrollbar
    }

    // no observer needed until elem exists
    if (!scrollElement) {
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
        calcHasScrollbar(entry.target)
      }
    })

    // Observe one or multiple elements
    ro.observe(scrollElement)
    calcHasScrollbar(scrollElement)
    return () => {
      if (scrollElement) {
        ro.unobserve(scrollElement)
      } else {
        ro.disconnect()
      }
    }
  }, [scrollElement, onScrollbarChange, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
