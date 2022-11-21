import React from 'react'
import FiltersContainer from './styled/FiltersContainer'

const SearchFilters = ({ searchState: { isFiltersOpen }, isScrollable, FilterFields }) => {
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
