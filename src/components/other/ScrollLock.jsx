import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import useIsoLayoutEffect from '../hooks/useIsoLayoutEffect'

const ScrollLock = ({ scrollNode, reserveScrollBarGap }) => {
  const option = {
    reserveScrollBarGap
  }
  function clear () {
    clearAllBodyScrollLocks()
  }
  useIsoLayoutEffect(() => {
    disableBodyScroll(scrollNode, option)
    return clear
  }, [])
  return null
}

export default ScrollLock
