import React from 'react'
import { Formik } from 'formik'
import { SearchBarInnerProvider } from './searchBarContext'

const SearchBarProvider = (props) => {
  const {
    initialValues,
    schema,
    search,
    onSubmit,
    children,
    ...options
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
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <SearchBarInnerProvider search={search} {...options}>
        {children}
      </SearchBarInnerProvider>
    </Formik>
  )
}

export default SearchBarProvider
