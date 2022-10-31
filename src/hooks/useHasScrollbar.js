import { useEffect, useState } from 'react'

const useHasVerticalScrollbar = (elem, boundingParent) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  if (!elem || !boundingParent) {
    return false
  }

  function calcHasScrollbar () {
    if (typeof elem.innerWidth === 'number') {
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
