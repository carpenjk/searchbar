import { useEffect, useState } from 'react'

const useHasVerticalScrollbar = (elem, boundingParent) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)

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
    return window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, boundingParent])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
