import React from 'react'
import { Formik } from 'formik'
import { SearchBarInnerProvider } from './SearchBarContext'

const SearchBarProvider = (props) => {
  const {
    initialValues,
    validationSchema,
    search,
    children,
    options
  } = props
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={search}
    >
      <SearchBarInnerProvider search={search} options={options}>
        {children}
      </SearchBarInnerProvider>
    </Formik>
  )
}

export default SearchBarProvider
