import { useEffect, useState } from 'react'

const useHasVerticalScrollbar = (elem, deps) => {
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const _deps = deps ? [...deps] : []

  useEffect(() => {
    function calcHasScrollbar () {
      if (!elem) {
        setHasScrollbar(false)
        return
      }
      setHasScrollbar(elem.scrollHeight > elem.clientHeight)
    }

    window.addEventListener('resize', calcHasScrollbar)
    calcHasScrollbar()
    return () => window.removeEventListener('resize', calcHasScrollbar)
  }, [elem, ..._deps])

  return (hasScrollbar)
}

export default useHasVerticalScrollbar
