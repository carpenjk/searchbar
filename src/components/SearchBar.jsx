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
  theme,
  options,
  ...props
}) => {
  return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={search}
      >
        <SearchBarInnerProvider allOpenMode={allOpenMode} search={search} options={options} theme={theme}>
          <SearchBarMenu {...props} />
        </SearchBarInnerProvider>
      </Formik>
  )
}

export default SearchBar
