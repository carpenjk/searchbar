import React from 'react'
import { Formik } from 'formik'
import { SearchBarInnerProvider } from './SearchBarContext'

const SearchBarProvider = (props) => {
  const {
    initialValues,
    validationSchema,
    search,
    children,
    ...providerProps
  } = props
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={search}
    >
      <SearchBarInnerProvider search={search} {...providerProps}>
        {children}
      </SearchBarInnerProvider>
    </Formik>
  )
}

export default SearchBarProvider
