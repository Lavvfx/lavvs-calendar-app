import './CalendarApp.css'
import { useState } from 'react'


const CalendarApp = () => {

  const monthImages = {
  January: "/Images/jan.jpg",
  February: "/Images/feb.jpg",
  March: "/Images/march.jpg",
  April: "/Images/april.jpg",
  May: "/Images/may.jpg",
  June: "/Images/june.jpg",
  July: "/Images/july.jpg",
  August: "/Images/august.jpg",
  September: "/Images/september.jpg",
  October: "/Images/october.jpg",
  November: "/Images/november.jpg",
  December: "/Images/december.jpg",
  }

  const daysOfWeek =['Sun','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ]

    const currentDate = new Date()

    const[ currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const[ currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const[selectedDate, setSelectedDate] = useState(currentDate)
    const[showEventPopup, setShowEventPopup] = useState(false)
    const[events , setEvents] = useState([])
    const[eventTime, setEventTime] = useState({hours:'00',minutes: '00'})
    const[eventText, setEventText] = useState('')


    const daysInMonth = new Date(currentYear,currentMonth + 1, 0).getDate()
    const firstDateOfMonth = new Date(currentYear,currentMonth,1).getDay()

    const prevMonth = () =>{
      setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11: prevMonth-1))
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear-1 : prevYear))
    }
    
    const nextMonth = () =>{
      setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0: prevMonth+1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear+1 : prevYear))
    }

    const handleDayClick = (day) =>{
      const clickedDate = new Date(currentYear, currentMonth,day)
      const today = new Date()

      if(clickedDate >= today || isSameDay(clickedDate,today)) {
        setSelectedDate(clickedDate)
        setShowEventPopup(true)
        setEventTime({hours:'00', minutes:'00'});
        setEventText('');
      }
    }

    const isSameDay = (date1, date2) => {
      return(
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      )
    }

    const handleEventSubmit = () => {
      const newEvent = {
        date : selectedDate,
          time: `${eventTime.hours.padStart(2,'0')}:${eventTime.minutes.padStart(2,'0')}`,
          text : eventText,
        }

        setEvents([...events, newEvent])
      setEventTime({hours:'00',minutes: '00'})
      setEventText("")
      setShowEventPopup(false)
      }

      
      const handleDeleteEvent = (eventId) =>{
        const updatedEvents =events.filter((event) => event.id !== eventId)

        setEvents(updatedEvents)
      }

    console.log(currentMonth,currentYear,currentDate)


  return (
    <div className="calendar-app">
      <div className="calendar">
        <img
          src={monthImages[monthsOfYear[currentMonth]]}
          alt={monthsOfYear[currentMonth]}
          className="month-images"
        />

        <div className="navigate-date">
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          </div>
          <div className='month-year-block'>
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
         
          <h2 className="year">{currentYear}</h2>
          </div>

          <div className="buttons">
            <i className="bx bx-chevron-right"onClick={nextMonth}></i>
          </div>
        </div>
        
        <div className="date-event-block">

          <div className="dates-block">

            <div className="weekdays">
            {daysOfWeek.map((day) =>(
              <span key={day}>{day}</span>))}
          </div>

          <div className="days">

              {[...Array(firstDateOfMonth).keys()].map((_, index) =>(
                <span key={`empty-${index}`}/>
              ))}
              {[...Array(daysInMonth).keys()].map((day) =>(
                <span key={day+1} className={day+1 === currentDate.getDate() && 
                  currentMonth === currentDate.getMonth() && 
                  currentYear===currentDate.getFullYear()
                    ? 'current-day'
                    : ''
                    }
                    onClick={() =>handleDayClick(day+1)}
                    >{day+1} </span>
              ))}

          </div>
          </div>

          <div className="events">

            {showEventPopup && (
              <div className="event-popup">
                      <div className="time-input">
                          <div className="event-popup-time"><h1>Time</h1></div>
                            <input type="number" name="hours" min={1} max={24} className="hours" value ={eventTime.hours} onChange={(e)=> setEventTime({...eventTime, hours: e.target.value })}/>
                            <input type="number" name="minutes" min={1} max={60} className="minutes" value ={eventTime.minutes} onChange={(e)=> setEventTime({...eventTime, minutes: e.target.value })}/>
                        </div>
                          <textarea placeholder="Enter Event Details(Maximum 60 characters)"value = {eventText} onChange={(e) =>{
                            if(e.target.value.length <= 60) {
                              setEventText(e.target.value)
                            }
                          }}
                          ></textarea>
                          <button className="event-popup-btn" onClick={handleEventSubmit}>Add Event</button>
                          <button className="close-event-popup" onClick={() =>setShowEventPopup(false)}>
                            <i className="bx bx-x"></i>
                          </button>
                    </div>
                  )}
                    {events.map((event, index) => (
                      <div className="event" key={index}>
                        <div className="event-date-wrapper">
                          <div className="event-date">
                            {`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}
                          </div>
                          <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">{event.text}</div>
                        <div className="event-buttons">
                          <i className="bx bxs-edit-alt"></i>
                          <i className='bx bxs-trash' onClick={() => handleDeleteEvent(event.id)}></i>
                        </div>
                      </div>
                    ))}

                    
                  </div>
          
        </div>
      </div>

                  
      </div>
    
  )
}

export default CalendarApp