import React from 'react'
import { Formik } from 'formik'
import SearchBarMenu from './SearchBarMenu'
import { SearchBarInnerProvider } from './SearchBarContext'

const SearchBar = ({
  initialValues,
  onSubmit,
  allOpenMode,
  search,
  validationSchema,
  options,
  ...props
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={search}
  >
    <SearchBarInnerProvider allOpenMode={allOpenMode} search={search} options={options}>
      <SearchBarMenu {...props} />
    </SearchBarInnerProvider>
  </Formik>
)

export default SearchBar
