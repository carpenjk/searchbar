import React from 'react'
import FiltersContainer from './styled/FiltersContainer'

const SearchFilters = (props) => {
  const { isScrollable, FilterFields, isFiltersOpen } = props
  //* context *********************************************************

  return (
    <FiltersContainer
      isSearchFiltersOpen={isFiltersOpen}
      isScrollable={isScrollable}
      className={`searchFilters ${isFiltersOpen ? 'searchFiltersOpen' : ''}`}
    >
      <FilterFields />
    </FiltersContainer>
  )
}

export default SearchFilters
