import React from 'react'
import { Formik } from 'formik'
import { SearchBarInnerProvider } from './SearchBarContext'

const SearchBarProvider = (props) => {
  const {
    initialValues,
    validationSchema,
    search,
    onSubmit,
    children,
    options
  } = props
  function handleSubmit (data) {
    if (onSubmit) {
      onSubmit(data)
    } else {
      search(data)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <SearchBarInnerProvider search={search} options={options}>
        {children}
      </SearchBarInnerProvider>
    </Formik>
  )
}

export default SearchBarProvider
