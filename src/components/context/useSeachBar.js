import { useContext } from 'react'
import { SearchBarContext } from './SearchBarContext'
const useSearchBar = () => {
  const context = useContext(SearchBarContext)
  return (context)
}

export default useSearchBar
