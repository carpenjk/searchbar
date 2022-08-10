import React from 'react'
const FilterHandler = (props) => {
  const { type, id } = props
  const { set, get } = props.valueFunctions
  const handleSelectFilterChange = (option) => {
    set({ [id]: Number(option.value) })
  }

  const handleCheckFilterChange = (e) => {
    const { id } = e.target
    set(id)
  }

  const fnChangeMap = {
    CustomSelect: handleSelectFilterChange,
    Checkbox: handleCheckFilterChange,
    default: handleCheckFilterChange
  }

  const getHandler = () => {
    if (fnChangeMap[type]) return fnChangeMap[type]
    return fnChangeMap.default
  }
  // const DynamicInput = input.component;
  const DynamicInput = props.component
  return <DynamicInput onInputChange={getHandler()} {...props} />
}

export default FilterHandler
