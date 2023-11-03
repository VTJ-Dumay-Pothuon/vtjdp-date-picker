import React, { useState, useRef, useEffect } from 'react'

import PropTypes from 'prop-types'

const DatePicker = (
{ 
  onChange = () => {}, value, style,
  lang = 'default', format = 'DMY', start = 'monday',
  id='date-picker',className='date-picker'
}) => {
  DatePicker.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    style: PropTypes.object,
    lang: PropTypes.string,
    format: PropTypes.string,
    start: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
  }
  // Whether the popup is displayed or not
  const [popupDisplay, setPopupDisplay] = useState(false)
  // The year chosen in the year selector input (default: current year)
  const [chosenYear, setChosenYear] = useState(new Date().getFullYear())
  // The current month chosen with the month selector arrows (default: current month)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  // Horizontally align the popup with the input field
  const [popupHorizontalAlign, setPopupHorizontalAlign] = useState(0)
  // Vertical align is automatic, but the popup is displayed
  // above the input field if there is not enough space below
  const [popupVerticalAlign, setPopupVerticalAlign] = useState(0)
  
  const popupRef = useRef(null)
  const yearSelectorRef = useRef(null)
  const inputFieldRef = useRef(null)

  // The first day of the week is different depending on the country / culture
  // ISO 8601 determines the first day of the week as Monday, so it's the default value
  const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
  const dayShift = days.indexOf(start.toLowerCase()) || 0

  // If the user clicks outside the popup after clicking in it, close it
  document.addEventListener('mousedown', (e) => {
    if (!popupDisplay) return
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setPopupDisplay(false)
    }
  })

  // A leap year is a year with 366 days instead of 365
  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  useEffect(() => {
    if (popupRef.current) {
      const popupRect = popupRef.current.getBoundingClientRect();
      if (popupRect.bottom > window.innerHeight) {
        setPopupVerticalAlign(0 - popupRect.height - inputFieldRef.current.offsetHeight - 4)
      } else {
        setPopupVerticalAlign(4)
      }
    }
  }, [popupDisplay])

  const handleInputFocus = () => {
    const inputRect = inputFieldRef.current.getBoundingClientRect()
    setPopupHorizontalAlign(inputRect.left)
    setPopupDisplay(true)
  }

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value)
    setChosenYear(newYear)
    daysOfTheMonth()
  }

  const handleYearBlur = () => {
    if (yearSelectorRef.current.value < yearSelectorRef.current.min) {
      yearSelectorRef.current.value = yearSelectorRef.current.min
    }
    if (yearSelectorRef.current.value > yearSelectorRef.current.max) {
      yearSelectorRef.current.value = yearSelectorRef.current.max
    }
  }

  const handleYearWheel = () =>  yearSelectorRef.current.focus()

  const toPreviousMonth = (e) => {
    e.preventDefault()
    setTimeout(() => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setChosenYear(chosenYear - 1)
        }
        else setCurrentMonth(currentMonth - 1)
        daysOfTheMonth()
    }, 10)
  }

  const toNextMonth = (e) => {
    e.preventDefault()
    setTimeout(() => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setChosenYear(chosenYear + 1)
        }
        else setCurrentMonth(currentMonth + 1)
        daysOfTheMonth()
    }, 10)
  }

  const daysOfTheWeek = () => {
    const daysOfTheWeekArray = []
  
    for (let day = 0 ; day < 7 ; day++) {
      const weekDayName = new Date(0, 0, day + 1).toLocaleDateString(lang || undefined, { weekday: 'short' })
      const trimmedName = weekDayName.slice(0, -1)
  
      daysOfTheWeekArray.push(
        <span key={day} style={{
          display: 'inline-block',
          width: '35px',
          textTransform: 'capitalize',
          textAlign: 'center',
        }}>
          {trimmedName}
        </span>
      )
    }
  
    return (
      <div className="week-days"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 40px)',
      }}>
        {daysOfTheWeekArray}
      </div>
    )
  }

  const clickOnDay = (day) => {
    day = day.toString().padStart(2, '0')
    const month = (currentMonth + 1).toString().padStart(2, '0')
    const newDate =
      // MDY for US format :
      format === 'MDY' ?
        `${month}/${day}/${chosenYear}`
      // YMD for ISO format :
      : format === 'YMD' ?
        `${chosenYear}/${month}/${day}`
      : // DMY is the default format :
    `${day}/${month}/${chosenYear}`

    inputFieldRef.current.value = newDate
    onChange(newDate)
    setPopupDisplay(false)
  }

  const daysOfTheMonth = () => {
    // Calculate month and previousMonth lengths
    let monthLength = 31
    let previousMonthLength = 31

    if ([4, 6, 9, 11].includes(currentMonth + 1)) {
      monthLength = 30
    }
    if ([5, 7, 10, 12].includes(currentMonth + 1)) {
      previousMonthLength = 30
    }
    if (currentMonth + 1 === 2) {
      monthLength = isLeapYear(chosenYear) ? 29 : 28
      previousMonthLength = isLeapYear(chosenYear) ? 29 : 28
    }
    if (currentMonth + 1 === 3) {
      previousMonthLength = isLeapYear(chosenYear) ? 29 : 28
    }

    // Calculate the index of the first day of the currentMonth
    const firstDayIndex = new Date(chosenYear, currentMonth, dayShift-1).getDay()

    // Create an array to hold the days of the month
    const monthPage = []

    // Add the last days of the previous currentMonth to fill the first week
    for (let i = 1 ; i <= firstDayIndex ; i++) {
      const previousMonthDay = previousMonthLength - firstDayIndex + i
      monthPage.push(
        <button
          key={"previousMonth-"+i}
          className="day-button previousMonth"
          style={{ width: '30px', border: 'none', background: 'none', color: '#CCC' }}
          onClick={toPreviousMonth}
        >
          {previousMonthDay}
        </button>
      )
    }

    // Add the days of the currentMonth
    for (let day = 1 ; day <= monthLength ; day++) {
      monthPage.push(
        <button
          key={"currentMonth-"+day}
          className="day-button currentMonth"
          style={{ width: '30px', border: 'none', background: 'none' }}
          onMouseDown={() => clickOnDay(day)}
          onMouseOver={(e) => e.target.style.background = '#EEE'}
          onMouseOut= {(e) => e.target.style.background = 'none'}
        >{day}</button>
      )
    }

    // Add the remaining days of the next currentMonth to reach 42 days (6 weeks of 7 days)
    for (let i = 1 ; i <= 42 - monthLength - firstDayIndex ; i++) {
      monthPage.push(
        <button
          key={"nextMonth"+i}
          className="day-button nextMonth"
          style={{ width: '30px', border: 'none', background: 'none', color: '#CCC' }}
          onMouseDown={toNextMonth}
        >
          {i}
        </button>
      )
    }

    // Return the array of days in a grid div
    return (
        <div className="month-days"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 40px)',
          gridTemplateRows: 'repeat(6, 24px)',
          margin: '0 3px'
        }}>
          {monthPage}
        </div>
      )
  }

  return (
    <React.Fragment>
      <input 
        id={id}
        className={className}
        style={style}
        type="text"
        value={value}
        ref={inputFieldRef}
        onFocus={handleInputFocus}
        onChange={(date) => onChange(date.target.value)}
      />
    <dialog id="popup" className="date-picker-popup" ref={popupRef}
        style={{ 
            height: '190px',
            padding: '10px', paddingRight: '0',
            marginLeft: `${popupHorizontalAlign}px`,
            marginTop:  `${popupVerticalAlign}px`,
            backgroundColor: '#FFF',
            border: '1px solid #CCC', borderBottomColor: '#BBB',
            boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.5)',
            display: (popupDisplay ? 'block' : 'none')
        }}>

        {/* Month selector */}
        <div className="month-selector" style = {{
          display: 'inline-block', 
          textAlign: 'center',
          marginLeft: '4px'
        }}>
          <button onClick={toPreviousMonth}>{'<'}</button>
          <span style = {{
            display: 'inline-block',
            width: '6rem',
            textTransform: 'capitalize',
            textAlign: 'center'
          }}>
            {new Date(chosenYear, currentMonth).
            toLocaleString(lang || undefined, { month: 'long' })}
          </span>
          <button onClick={toNextMonth}>{'>'}</button>
        </div>

        {/* Year selector */}
        <input
          type="number"
          ref={yearSelectorRef}
          min="1900"
          max={new Date().getFullYear()}
          value={chosenYear}
          onChange={handleYearChange}
          onBlur={handleYearBlur}
          onWheel={handleYearWheel}
          style = {{
            width: '51px',
            marginRight: '16px',
            float: 'right'
          }}
        />
        {daysOfTheWeek()}

        {daysOfTheMonth()}
      </dialog>
    </React.Fragment>
  )
}

export {DatePicker}