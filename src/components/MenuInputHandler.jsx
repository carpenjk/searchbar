import React from 'react'
// import InputBase from '../InputBase';
// import CustomSelect from '../CustomSelect';
// import DateRange from '../DateRange';

// for dynamically rendering React elements from JSON
// Add an entry for each custom component referenced in the file
// const Components = {
//   DateRange: DateRange,
//   CustomSelect: CustomSelect,
//   InputBase: InputBase,
// };

const MenuInputHandler = (props) => {
  const { type, inputRef, InputComponent, ...fwdProps } = props
  const { valueFunctions, input } = fwdProps
  const { set } = valueFunctions
  // const InputType = input.type;

  const handleSelectChange = (option) => {
    set({ [fwdProps.id]: Number(option.value) })
  }

  const handleDateChange = (date, id) => {
    set({ [id]: date })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id) set({ [id]: value })
    e.stopPropagation()
  }

  const fnChangeMap = {
    select: handleSelectChange,
    date: handleDateChange,
    default: handleInputChange
  }

  const getHandler = () => {
    if (fnChangeMap[type]) return fnChangeMap[type]
    return fnChangeMap.default
  }

  // const DynamicInput = Components[input.type];
  return (
    <InputComponent ref={inputRef} onInputChange={getHandler()} {...fwdProps} />
  )
}

export default MenuInputHandler
