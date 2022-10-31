import { useEffect, useState } from 'react'

const useHasVerticalScrollbar = (elem, boundingParent) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  function calcHasScrollbar () {
    if (typeof elem.innerWidth === 'number') {
      setHasScrollbar(elem.innerHeight > boundingParent.innerHeight)
    }
  }

  useEffect(() => {
    if (!elem || !boundingParent) {
      setHasScrollbar(false)
      return
    }
    boundingParent.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return boundingParent.removeEventListener('resize', calcHasScrollbar)
  }, [elem, boundingParent])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
