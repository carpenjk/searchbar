import { useEffect, useState } from 'react'

const useHasVerticalScrollbar = (elem, boundingParent) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  function calcHasScrollbar () {
    if (typeof elem.innerWidth === 'number') {
      if (!elem || !boundingParent) {
        setHasScrollbar(false)
        return
      }
      setHasScrollbar(elem.innerHeight > boundingParent.innerHeight)
    }
  }

  useEffect(() => {
    boundingParent.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return boundingParent.removeEventListener('resize', calcHasScrollbar)
  }, [])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
