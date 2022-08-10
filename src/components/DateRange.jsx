import React, { Component, createRef } from 'react'

import DateHandler from '../base/input/DateHandler'

class DateRange extends Component {
  constructor (props) {
    super(props)

    const { startProps, endProps, valueFunctions } = props
    const { get } = valueFunctions
    this.state = {
      startDate: {
        id: startProps.id,
        ref: createRef()
      },
      endDate: {
        id: endProps.id,
        ref: createRef()
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { startDate, endDate } = this.state
    const { valueFunctions } = this.props
    const { get, set } = valueFunctions
    const { get: prevGet } = prevProps.valueFunctions
    // if start date changes, clear endDate to force valid range selection
    const prevDate = prevGet(prevState.startDate.id)
    const newDate = get(startDate.id)

    if (prevDate && newDate && prevDate.getTime() !== newDate.getTime()) {
      set({ [endDate.id]: null })
    }
  }

  //* event handlers *********************************************************
  handleStartSelect = () => {
    const {
      endDate: { ref: endDateRef }
    } = this.state
    // move focus to end date component
    if (endDateRef && endDateRef.current) endDateRef.current.input.focus()
  }

  handleEndSelect = () => {
    const { nextFocusRef, focusNext } = this.props
    if (focusNext && nextFocusRef) nextFocusRef.focus()
  }

  handleChange = (date, id) => {
    const { valueFunctions } = this.props
    valueFunctions.set({ [id]: date })
  }

  handleStartChange = (date) => {
    const { onChange } = this.props
    const { startDate } = this.state
    const change = onChange || this.handleChange
    change(date, startDate.id)
  }

  handleEndChange = (date) => {
    const { onChange } = this.props
    const { endDate } = this.state
    const change = onChange || this.handleChange
    change(date, endDate.id)
  }

  //* external methods*******************************************************
  focus () {
    const { startDate } = this.state
    if (startDate.ref.current) startDate.ref.current.input.focus()
  }

  render () {
    const {
      startProps,
      endProps,
      filterStartDate,
      filterEndDate,
      valueFunctions,
      onFocus,
      popperParent,
      forceClose,
      showInsetPlaceholder,
      showLabel,
      tw
    } = this.props

    const isTwAry = Array.isArray(tw)
    const twStartDate = isTwAry ? tw[0] : tw
    const twEndDate = isTwAry ? tw[1] : tw

    // get values for each controlled component
    const { startDate, endDate } = this.state
    const { get } = valueFunctions
    const startDateVal = get(startProps.id)
    const endDateVal = get(endProps.id)

    function getMinDate () {
      const dt = new Date()
      if (startDateVal) {
        dt.setUTCDate(startDateVal.getUTCDate() + 1)
        return dt
      }
    }

    return (
      <>
        {/* Picker for start of range */}
        <DateHandler
          tw={twStartDate}
          filterDate={filterStartDate}
          key="startDate"
          id={startProps.id}
          name={startProps.id}
          label="Arrive"
          showLabel={showLabel}
          showInsetPlaceholder={showInsetPlaceholder}
          placeholder={startProps.placeholder}
          icon={startProps.icon.url}
          iconOffset={startProps.icon.iconOffset}
          textOffset={startProps.textOffset}
          width={startProps.width}
          selected={startDateVal}
          startDate={startDateVal}
          endDate={endDateVal}
          selectsStart
          minDate={new Date()}
          onChange={this.handleStartChange}
          onSelect={this.handleStartSelect}
          onFocus={onFocus}
          inputRef={startDate.ref}
          allowSameDay
          // popperParent={popperParent}
          forceClose={forceClose}
        />
        {/* Picker for end of range */}
        <DateHandler
          tw={twEndDate}
          allowSameDay={false}
          filterDate={filterEndDate}
          key="endDate"
          id={endProps.id}
          name={endProps.id}
          label="Depart"
          showLabel={showLabel}
          showInsetPlaceholder={showInsetPlaceholder}
          placeholder={endProps.placeholder}
          icon={endProps.icon.url}
          iconOffset={endProps.icon.iconOffset}
          textOffset={endProps.textOffset}
          width={endProps.width}
          selected={endDateVal}
          startDate={startDateVal}
          endDate={endDateVal}
          minDate={getMinDate()}
          highlightDates={[startDateVal || undefined]}
          selectsEnd
          openToDate={startDateVal}
          onSelect={this.handleEndSelect}
          onChange={this.handleEndChange}
          onFocus={onFocus}
          inputRef={endDate.ref}
          // popperParent={popperParent}
          forceClose={forceClose}
        />
      </>
    )
  }
}

export default DateRange
