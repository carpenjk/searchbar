import React from 'react'
import FiltersContainer from './FiltersContainer'

const SearchFilters = (props) => {
  const { isScrollable, checkFilters, FilterFields, isFiltersOpen } = props
  //* context *********************************************************

  return (
    <FiltersContainer
      isSearchFiltersOpen={isFiltersOpen}
      isScrollable={isScrollable}
      className={`searchFilters ${isFiltersOpen ? 'searchFiltersOpen' : ''}`}
    >
      <FilterFields checkFilters={checkFilters} />
    </FiltersContainer>
  )
}

export default SearchFilters
