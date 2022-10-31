import { useEffect, useState } from 'react'

const useHasVerticalScrollbar = (elem, boundingParent, deps) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    function calcHasScrollbar () {
      if (!elem || !boundingParent) {
        setHasScrollbar(false)
        return
      }
      const elemHeight = elem.getBoundingClientRect().height
      const boundingParentHeight = boundingParent.getBoundingClientRect().height
      setHasScrollbar(elemHeight > boundingParentHeight)
    }

    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, boundingParent, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
