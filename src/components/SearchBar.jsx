import React from 'react'
import { Formik } from 'formik'
import SearchBarMenu from './SearchBarMenu'
import { SearchBarInnerProvider } from './context/SearchBarContext'

const SearchBar = ({
  initialValues,
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
        <SearchBarInnerProvider search={search} options={options} theme={theme}>
          <SearchBarMenu {...props} />
        </SearchBarInnerProvider>
      </Formik>
  )
}

export default SearchBar
